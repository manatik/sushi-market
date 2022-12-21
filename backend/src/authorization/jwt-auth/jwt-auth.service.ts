import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { ErrorService } from '@error/error.service';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UserEntity } from '@user/enitity/user.entity';
import { TOKENS } from '@jwt-auth/enum';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly errorService: ErrorService,
    private readonly configService: ConfigService,
  ) {}

  async login({ phone, password }: LoginDto) {
    try {
      const { user } = await this.userService.getBy({ phone }, { withPassword: true, withRoles: true });

      if (!user) {
        throw this.errorService.badRequest('Пользователя с таким номером телефона не существует');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw this.errorService.badRequest('Неверный пароль');
      }

      if (user.dateDeleted) {
        throw this.errorService.badRequest('Пользователь заблокирован');
      }

      const payload = this.getPayload(user);
      const refreshToken = await this.generateToken(payload, '30d');
      const accessToken = await this.generateToken(payload, '24h');

      return { accessToken, refreshToken };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw this.errorService.internal('Ошибка авторизации', e.message);
    }
  }

  async register(dto: CreateUserDto) {
    const { user } = await this.userService.create(dto);
    const payload = this.getPayload(user);
    const refreshToken = await this.generateToken(payload, '30d');
    const accessToken = await this.generateToken(payload, '24h');

    return { accessToken, refreshToken };
  }

  async refresh(cookies) {
    try {
      if (!cookies[TOKENS.REFRESH]) {
        throw this.errorService.forbidden('Невалидный токен', '');
      }

      const refreshToken = cookies[TOKENS.REFRESH];

      const refreshTokenInfo = this.jwtService.verify(refreshToken, { secret: this.configService.get('JWT_SECRET') });

      const expireIn = dayjs.unix(refreshTokenInfo.exp).toISOString();

      const { user } = await this.userService.getBy(
        {
          phone: refreshTokenInfo.phone,
        },
        { withRoles: true },
      );

      if (!user || user.dateDeleted) {
        throw this.errorService.badRequest('Пользователь удалён или заблокирован');
      }

      const payload = this.getPayload(user);

      if (dayjs().diff(expireIn, 'millisecond') > 0) {
        const refreshToken = await this.generateToken(payload, '30d');
        const accessToken = await this.generateToken(payload, '24h');

        return { accessToken, refreshToken };
      }

      const accessToken = await this.generateToken(payload, '24h');

      return { accessToken, refreshToken: null };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw this.errorService.internal('Ошибка обновления токена', JSON.stringify(e));
    }
  }

  private async generateToken(payload: any, expiresIn: '30d' | '24h') {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  private getPayload(dto: UserEntity) {
    return { id: dto.id, roles: dto.roles };
  }
}
