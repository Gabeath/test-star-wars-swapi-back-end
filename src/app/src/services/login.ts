import UserRepository from '@repositories/user';

import BusinessError, { ValidationCodeError } from '@utilities/errors/business';
import { cryptPassword, generateJWT } from '@utilities/utils';

export default class LoginService {
  static async auth({ email, password }: { email: string, password: string }) {
    const passwordEncrypted = cryptPassword(password);

    const user = await UserRepository.selectOne({
      where: {
        email,
        password: passwordEncrypted,
      },
    });

    if (!user) {
      throw new BusinessError(ValidationCodeError.INVALID_CREDENTIALS);
    }

    return { token: generateJWT({ userId: user.id }) };
  }
}
