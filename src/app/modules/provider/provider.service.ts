import prisma from "../../config/prisma";

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

const updateRentalStatusByProvider = async (
  id: string,
  providerId: string,
  status: any,
) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id },
    include: { items: { include: { gear: true } } },
  });

  if (!order) {
    const error: any = new Error("Rental tracking ledger not found");
    error.statusCode = 404;
    throw error;
  }

  const ownsGear = order.items.some(
    (item) => item.gear.providerId === providerId,
  );
  if (!ownsGear) {
    const error: any = new Error(
      "Unauthorized to modify status parameters on this order",
    );
    error.statusCode = 403;
    throw error;
  }

  return await prisma.rentalOrder.update({
    where: { id },
    data: { status },
  });
};

export const ProviderService = {
  updateGearListing,
  removeGearListing,
  updateRentalStatusByProvider,
};
