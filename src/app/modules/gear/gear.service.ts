// import prisma from "../../config/prisma";

import prisma from "../../config/prisma";

interface GearFilters {
  category?: string;
  brand?: string;
  price?: string;
  available?: string;
}

const createGear = async (gearData: {
  name: string;
  description?: string;
  brand?: string;
  pricePerDay: number;
  stock?: number;
  image?: string;
  providerId: string;
  categoryId: string;
}) => {
  const newGear = await prisma.gearItem.create({
    data: {
      name: gearData.name,
      description: gearData.description,
      brand: gearData.brand,
      pricePerDay: gearData.pricePerDay,
      stock: gearData.stock,
      image: gearData.image,
      providerId: gearData.providerId,
      categoryId: gearData.categoryId,
    },
    include: {
      category: true,
    },
  });

  return newGear;
};

const getAllGear = async (filters: GearFilters) => {
  const where: any = {};

  if (filters.category) {
    where.category = { slug: filters.category };
  }

  if (filters.brand) {
    where.brand = { contains: filters.brand, mode: "insensitive" };
  }

  if (filters.available) {
    where.available = filters.available === "true";
  }

  const gearItems = await prisma.gearItem.findMany({
    where,
    include: { category: true, reviews: true },
    orderBy: { createdAt: "desc" },
  });

  return gearItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    brand: item.brand,
    pricePerDay: Number(item.pricePerDay),
    stock: item.stock,
    available: item.available,
    image: item.image,
    category: item.category,
    reviews: item.reviews,
  }));
};

const getSingleGear = async (id: string) => {
  const item = await prisma.gearItem.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: true,
      provider: { select: { id: true, name: true, email: true } },
    },
  });

  if (!item) {
    const error: any = new Error("Gear item not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    brand: item.brand,
    pricePerDay: Number(item.pricePerDay),
    stock: item.stock,
    available: item.available,
    image: item.image,
    category: item.category,
    provider: item.provider,
    reviews: item.reviews,
  };
};

const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
};

const updateGearListing = async (
  id: string,
  providerId: string,
  payload: any,
) => {
  const gear = await prisma.gearItem.findFirst({ where: { id, providerId } });
  if (!gear) {
    const error: any = new Error("Gear item not found or unauthorized access");
    error.statusCode = 404;
    throw error;
  }
  return await prisma.gearItem.update({
    where: { id },
    data: payload,
  });
};

const removeGearListing = async (id: string, providerId: string) => {
  const gear = await prisma.gearItem.findFirst({ where: { id, providerId } });
  if (!gear) {
    const error: any = new Error("Gear item not found or unauthorized access");
    error.statusCode = 404;
    throw error;
  }
  return await prisma.gearItem.delete({ where: { id } });
};

export const GearService = {
  getAllGear,
  getSingleGear,
  getCategories,
  createGear,
  updateGearListing,
  removeGearListing,
};
