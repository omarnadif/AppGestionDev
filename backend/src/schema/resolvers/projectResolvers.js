// src/schema/resolvers/user.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const projectResolvers = {
  Query: {
    projects: () => prisma.project.findMany(),
    project: (_, { id }) => prisma.project.findUnique({ where: { id } }),
  },
  Mutation: {
    createProject: (_, { input }) => prisma.project.create({ data: input }),
    updateProject: (_, { id, input }) =>
      prisma.project.update({
        where: { id },
        data: input,
      }),
  },
};
