import prisma from "../../config/prisma";

// ১. নতুন ক্যাটাগরি তৈরি করার সার্ভিস
const createCategory = async (payload: {
  name: string;
  description?: string;
}) => {
  // একই নামের ক্যাটাগরি অলরেডি আছে কিনা চেক করা (যেহেতু name ইউনিক)
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

// ২. সব ক্যাটাগরি নিয়ে আসার সার্ভিস
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
