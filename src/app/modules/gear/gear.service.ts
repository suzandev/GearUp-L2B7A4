import prisma from "../../config/prisma";

const getAllGear = async () => {
  const result = await prisma.gearItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSingleGear = async (id: string) => {
  const result = await prisma.gearItem.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const GearService = {
  getAllGear,
  getSingleGear,
};
