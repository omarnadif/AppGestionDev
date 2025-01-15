export const context = ({ req }) => {
  return {
    prisma: new PrismaClient(),
    // Ajouter la gestion de l'authentification ici
  };
};
