import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtAuthService } from '@jwt-auth/jwt-auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators';
import { ErrorService } from '@error/error.service';
import { CookieOptions, Response } from 'express';
import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { TOKENS } from '@jwt-auth/enum';

const COOKIE_CONFIG: CookieOptions = {
  httpOnly: true,
};

@Public()
@Controller(GLOBAL_PREFIXES.AUTH)
export class JwtAuthController {
  constructor(private readonly authService: JwtAuthService, private readonly errorService: ErrorService) {}

  @Post(ENDPOINTS.AUTH.LOGIN)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { refreshToken, accessToken } = await this.authService.login(dto);
    res.cookie(TOKENS.REFRESH, refreshToken, COOKIE_CONFIG);
    res.cookie(TOKENS.ACCESS, accessToken, COOKIE_CONFIG);
    res.json(this.errorService.success('Успешный вход', { accessToken }));
  }

  @Post(ENDPOINTS.AUTH.REGISTER)
  async register(@Body() dto: CreateUserDto, @Res() res: Response) {
    const { refreshToken, accessToken } = await this.authService.register(dto);
    res.cookie(TOKENS.REFRESH, refreshToken, COOKIE_CONFIG);
    res.cookie(TOKENS.ACCESS, accessToken, COOKIE_CONFIG);
    res.json(this.errorService.success('Успешная регистрация', { accessToken }));
  }

  @Post(ENDPOINTS.AUTH.REFRESH)
  async refresh(@Body() cookies, @Res() res: Response) {
    const tokens = await this.authService.refresh(cookies);

    if (tokens.refreshToken) {
      res.cookie(TOKENS.REFRESH, tokens.refreshToken, COOKIE_CONFIG);
      res.cookie(TOKENS.ACCESS, tokens.accessToken, COOKIE_CONFIG);
    }

    res.json(this.errorService.success('Токены успешно обновлены', { ...tokens }));
  }
}
