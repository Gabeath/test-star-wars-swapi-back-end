import { CustomError } from 'ts-custom-error';

export default class BusinessError extends CustomError {
  code: string;

  options: { [key: string]: string | number | boolean };

  isBusinessError = true;

  constructor(code: string, options?: { [key: string]: string | number | boolean }) {
    super(code);
    this.code = code;
    this.options = options || {};
  }
}

export const UserCodeError = {
  EMAIL_ALREADY_REGISTERED: 'email_already_registered',
  USER_NOT_FOUND: 'user_not_found',
};
