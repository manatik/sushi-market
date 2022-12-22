import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISuccessResponseType } from '@common-types/ISuccessResponse.type';

@Injectable()
export class ErrorService {
  badRequest(message: string, error?: string) {
    return new HttpException({ message, error: error || true, success: false }, HttpStatus.BAD_REQUEST);
  }

  success<T>(message: string, data?: T): ISuccessResponseType & T {
    return {
      error: false,
      success: true,
      message,
      ...data,
    };
  }

  internal(message: string, error: string) {
    return new HttpException({ message, error, success: false }, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  unauthorized() {
    return new HttpException(
      { message: 'Не авторизован', error: true, success: false, isAuth: false },
      HttpStatus.UNAUTHORIZED,
    );
  }

  forbidden(message: string, error: string) {
    return new HttpException({ message, error, success: false }, HttpStatus.FORBIDDEN);
  }
}
