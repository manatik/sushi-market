import { User } from '@common-types/User.type';
import { ErrorService } from '@error/error.service';
import { TOKENS } from '@jwt-auth/enum';
import { VerifyToken } from '@jwt-auth/types';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UserEntity } from '@user/enitity/user.entity';
import { UserService } from '@user/user.service';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { LoginDto } from './dto/login.dto';

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
        throw this.errorService.forbidden('Невалидный токен!', 'Unauthorized!');
      }

      const refreshToken = cookies[TOKENS.REFRESH];

      const { info: refreshTokenInfo, expireIn: expireInRefresh } = this.verifyToken(refreshToken);

      const { user } = await this.userService.getBy({ id: refreshTokenInfo.id }, { withRoles: true });

      if (!user || user.dateDeleted) {
        throw this.errorService.forbidden('Пользователь удалён или заблокирован', 'Ошибка валидации пользователя');
      }

      const payload = this.getPayload(user);

      // if refresh token is expired
      if (dayjs().isAfter(expireInRefresh)) {
        const refreshToken = await this.generateToken(payload, '30d');
        const accessToken = await this.generateToken(payload, '24h');

        return { accessToken, refreshToken };
      }

      const accessTokenCookie = cookies[TOKENS.ACCESS];

      const { expireIn: expireInAccess } = this.verifyToken(accessTokenCookie);
      // if access token is fresh
      if (dayjs().isBefore(expireInAccess)) {
        return { accessToken: accessTokenCookie, refreshToken: null };
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

  async isAuth(cookies: Record<string, string>) {
    try {
      if (!cookies[TOKENS.ACCESS]) {
        throw this.errorService.unauthorized();
      }

      const { isValid, info } = this.verifyToken(cookies[TOKENS.ACCESS]);

      if (!isValid) {
        throw this.errorService.unauthorized();
      }

      const { user } = await this.userService.getBy({ id: info.id }, { withRoles: true });

      if (!user) {
        throw this.errorService.unauthorized();
      }

      return { isAuth: isValid, roles: info.roles };
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw this.errorService.internal('Ошибка валидации авторизации', e.message);
    }
  }

  private verifyToken(token: string): VerifyToken {
    let expireIn = 0;
    try {
      const info = this.jwtService.verify<User<{ exp: number; iat: number }>>(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      expireIn = dayjs(info.exp * 1000).valueOf();

      return { isValid: true, info, expireIn };
    } catch (e) {
      return { isValid: false, info: null, expireIn };
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
