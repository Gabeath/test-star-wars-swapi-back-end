import { PrismaClient, Prisma, Users } from '@prisma/client';

const prisma = new PrismaClient();

export default class UserRepository {
  static async create(user: Users) {
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
