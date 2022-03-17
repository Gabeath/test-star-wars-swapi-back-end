import dotenv from 'dotenv';

dotenv.config();

export default class Constants {
  static port = process.env.PORT || '3000';

  static timezone = process.env.TIMEZONE;

  static language = process.env.LANGUAGE;

  static password = {
    secretPassword: process.env.SECRET_PASS || '',
    iterations: Number(process.env.SECRET_ITERATION),
    keylen: Number(process.env.SECRET_KEY_LEN),
    digest: 'SHA256',
  };

  static jwtSecret = process.env.JWT_SECRET || '';
}
