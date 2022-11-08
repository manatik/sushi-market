import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Role } from '@jwt-auth/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      const requireRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

      if (!requireRoles?.length) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers?.authorization;
      const token = authHeader?.split(' ')[1];

      const tokenInfo = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return tokenInfo.roles.some((role) => requireRoles.includes(role?.name));
    } catch (e) {
      throw new HttpException(
        {
          message: 'Ошибка роли или токен не действителен',
          error: e.message,
          success: false,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
