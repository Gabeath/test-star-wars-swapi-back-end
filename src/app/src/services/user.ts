import { Users } from '@prisma/client';

import UserRepository from '@repositories/user';

import BusinessError, { UserCodeError } from '@utilities/errors/business';
import { cryptPassword, generateJWT } from '@utilities/utils';

export default class UserService {
  static async create(user: Users) {
    const userSaved = await UserRepository.selectOne({
      where: {
        OR: [
          { email: user.email },
          { phone: user.phone },
        ],
      },
    });

    if (userSaved?.email === user.email) {
      throw new BusinessError(UserCodeError.EMAIL_ALREADY_REGISTERED);
    } else if (userSaved?.phone === user.phone) {
      throw new BusinessError(UserCodeError.PHONE_ALREADY_REGISTERED);
    }

    const passwordEncrypted = cryptPassword(user.password);

    const userCreated = await UserRepository.create({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: passwordEncrypted,
    } as Users);

    return { token: generateJWT({ userId: userCreated.id }) };
  }
}
