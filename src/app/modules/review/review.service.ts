import prisma from "../../config/prisma";

const createReviewInDB = async (
  customerId: string,
  payload: { gearId: string; rating: number; comment?: string },
) => {
  const result = await prisma.review.create({
    data: {
      customerId,
      gearId: payload.gearId,
      rating: Number(payload.rating),
      comment: payload.comment,
    },
  });

  return result;
};

export const ReviewService = {
  createReviewInDB,
};
