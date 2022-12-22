import { ENDPOINTS, GLOBAL_PREFIXES } from '@consts/endpoints.consts';
import { ErrorService } from '@error/error.service';
import { TOKENS } from '@jwt-auth/enum';
import { JwtAuthService } from '@jwt-auth/jwt-auth.service';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { CookieOptions, Request, Response } from 'express';
import { Public } from './decorators';
import { LoginDto } from './dto/login.dto';

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
    res.json(this.errorService.success('Успешный вход'));
  }

  @Post(ENDPOINTS.AUTH.REGISTER)
  async register(@Body() dto: CreateUserDto, @Res() res: Response) {
    const { refreshToken, accessToken } = await this.authService.register(dto);
    res.cookie(TOKENS.REFRESH, refreshToken, COOKIE_CONFIG);
    res.cookie(TOKENS.ACCESS, accessToken, COOKIE_CONFIG);
    res.json(this.errorService.success('Успешная регистрация'));
  }

  @Get(ENDPOINTS.AUTH.IS_AUTH)
  async isAuth(@Req() req: Request) {
    return await this.authService.isAuth(req.cookies);
  }

  @Get(ENDPOINTS.AUTH.REFRESH)
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { refreshToken, accessToken } = await this.authService.refresh(req.cookies);

    if (refreshToken) {
      res.cookie(TOKENS.REFRESH, refreshToken, COOKIE_CONFIG);
      res.cookie(TOKENS.ACCESS, accessToken, COOKIE_CONFIG);
    } else {
      res.cookie(TOKENS.ACCESS, accessToken, COOKIE_CONFIG);
    }

    res.json(this.errorService.success('Токены успешно обновлены'));
  }

  @Get(ENDPOINTS.AUTH.LOGOUT)
  async logout(@Res() res: Response) {
    res.clearCookie(TOKENS.REFRESH, COOKIE_CONFIG);
    res.clearCookie(TOKENS.ACCESS, COOKIE_CONFIG);
    res.json(this.errorService.success('Пока-пока, до встречи :)'));
  }
}
