import prisma from "../../config/prisma";

const createCategory = async (payload: {
  name: string;
  description?: string;
}) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: { name: payload.name },
  });

  if (isCategoryExist) {
    const error: any = new Error("Category name already exists");
    error.statusCode = 400;
    throw error;
  }

  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
};
