import prisma from "../../config/prisma";

const createRentalOrder = async (
  customerId: string,
  payload: {
    startDate: string;
    endDate: string;
    items: { gearId: string; quantity: number }[];
  },
) => {
  const { startDate, endDate, items } = payload;
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    const error: any = new Error("Start date must be before end date");
    error.statusCode = 400;
    throw error;
  }

  const durationInDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const gear = await tx.gearItem.findUnique({
        where: { id: item.gearId },
      });

      if (!gear) {
        const error: any = new Error(
          `Gear item with ID ${item.gearId} not found`,
        );
        error.statusCode = 404;
        throw error;
      }

      if (!gear.available || gear.stock < item.quantity) {
        const error: any = new Error(
          `Not enough stock available for ${gear.name}`,
        );
        error.statusCode = 400;
        throw error;
      }

      const itemPrice = gear.pricePerDay * item.quantity * durationInDays;
      totalAmount += itemPrice;

      const updatedStock = gear.stock - item.quantity;
      await tx.gearItem.update({
        where: { id: item.gearId },
        data: {
          stock: updatedStock,
          available: updatedStock > 0,
        },
      });

      orderItemsData.push({
        gearId: item.gearId,
        quantity: item.quantity,
        price: gear.pricePerDay,
      });
    }

    const order = await tx.rentalOrder.create({
      data: {
        customerId,
        startDate: start,
        endDate: end,
        totalAmount,
        status: "PENDING",
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: {
            gear: true,
          },
        },
      },
    });

    return order;
  });
};

const getUserOrders = async (userId: string, role: string) => {
  const whereCondition: any = {};

  if (role === "CUSTOMER") {
    whereCondition.customerId = userId;
  } else if (role === "PROVIDER") {
    whereCondition.items = {
      some: {
        gear: { providerId: userId },
      },
    };
  }

  return await prisma.rentalOrder.findMany({
    where: whereCondition,
    include: {
      items: { include: { gear: true } },
      customer: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getOrderDetails = async (id: string, userId: string, role: string) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id },
    include: {
      items: { include: { gear: true } },
      customer: { select: { id: true, name: true, email: true } },
    },
  });

  if (!order) {
    const error: any = new Error("Rental order not found");
    error.statusCode = 404;
    throw error;
  }

  if (role === "CUSTOMER" && order.customerId !== userId) {
    const error: any = new Error("Forbidden access");
    error.statusCode = 403;
    throw error;
  }

  return order;
};

export const RentalService = {
  createRentalOrder,
  getUserOrders,
  getOrderDetails,
};
