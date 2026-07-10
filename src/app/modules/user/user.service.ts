import prisma from "../../config/prisma";

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      phone: true,
      address: true,
      createdAt: true,
    },
  });

  if (!user) {
    const error: any = new Error("User profile not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateMyProfileInDB = async (userId: string, payload: any) => {
  const userExists = await prisma.user.findUnique({ where: { id: userId } });

  if (!userExists) {
    const error: any = new Error("User accounts record not found");
    error.statusCode = 404;
    throw error;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
    },
  });

  return updatedUser;
};

export const UserService = {
  getMyProfileFromDB,
  updateMyProfileInDB,
};
