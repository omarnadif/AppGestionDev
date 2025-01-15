// src/schema/resolvers/user.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const taskResolvers = {
  Query: {
    tasks: () => prisma.task.findMany(),
    task: (_, { id }) => prisma.task.findUnique({ where: { id } }),
  },
  Mutation: {
    createTask: (_, { input }) => prisma.task.create({ data: input }),
    updateTask: (_, { id, input }) =>
      prisma.task.update({
        where: { id },
        data: input,
      }),
  },
};
