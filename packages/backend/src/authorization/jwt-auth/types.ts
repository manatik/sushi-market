import { User } from '@common-types/User.type';

export type VerifyToken = {
  isValid: boolean;
  info: User<{ exp: number; iat: number }> | null;
  expireIn: number;
};
