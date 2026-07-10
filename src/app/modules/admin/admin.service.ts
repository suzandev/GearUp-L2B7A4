import prisma from "../../config/prisma";

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};

const updateUserStatus = async (id: string, status: "ACTIVE" | "SUSPENDED") => {
  const userExists = await prisma.user.findUnique({ where: { id } });
  if (!userExists) {
    const error: any = new Error("User accounts record not found");
    error.statusCode = 404;
    throw error;
  }
  return await prisma.user.update({
    where: { id },
    data: { status },
  });
};

const getAllGear = async () => {
  return await prisma.gearItem.findMany({
    include: {
      category: true,
      provider: { select: { name: true, email: true } },
    },
  });
};

const getAllRentals = async () => {
  return await prisma.rentalOrder.findMany({
    include: {
      customer: { select: { name: true, email: true } },
      items: { include: { gear: true } },
    },
  });
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};
