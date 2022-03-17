import { PrismaClient, Prisma } from '@prisma/client';

import { IUser } from '@models/user';

const prisma = new PrismaClient();

export default class UserRepository {
  static async create(user: IUser) {
    return prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
      },
    });
  }

  static async selectOne(args: Prisma.UsersFindFirstArgs) {
    return prisma.users.findFirst(args);
  }
}
