// src/schema/resolvers/user.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userResolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }) => prisma.user.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_, { input }) => prisma.user.create({ data: input }),
    updateUser: (_, { id, input }) =>
      prisma.user.update({
        where: { id },
        data: input,
      }),
  },
};
