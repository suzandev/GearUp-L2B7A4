import Stripe from "stripe";
import prisma from "../../config/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createPaymentIntent = async (rentalOrderId: string, userId: string) => {
  const order = await prisma.rentalOrder.findUnique({
    where: { id: rentalOrderId },
  });

  if (!order) {
    const error: any = new Error("Rental order not found");
    error.statusCode = 404;
    throw error;
  }

  if (order.customerId !== userId) {
    const error: any = new Error("Unauthorized to pay for this order");
    error.statusCode = 403;
    throw error;
  }

  const amountInCents = Math.round(order.totalAmount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    payment_method_types: ["card"],
    metadata: { rentalOrderId },
  });

  const paymentRecord = await prisma.payment.upsert({
    where: { rentalOrderId },
    update: {
      amount: order.totalAmount,
      transactionId: paymentIntent.id,
      method: "STRIPE",
      provider: "STRIPE",
      status: "PENDING",
    },
    create: {
      rentalOrderId,
      customerId: userId,
      amount: order.totalAmount,
      transactionId: paymentIntent.id,
      method: "STRIPE",
      provider: "STRIPE",
      status: "PENDING",
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    transactionId: paymentIntent.id,
    amount: order.totalAmount,
  };
};

const confirmPayment = async (transactionId: string) => {
  const stripeIntent = await stripe.paymentIntents.retrieve(transactionId);

  if (stripeIntent.status !== "succeeded") {
    const error: any = new Error(
      "Payment has not been completed on Stripe yet",
    );
    error.statusCode = 400;
    throw error;
  }

  return await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.findFirst({
      where: { transactionId },
    });

    if (!payment) {
      const error: any = new Error("Payment record not found in system");
      error.statusCode = 404;
      throw error;
    }

    const updatedPayment = await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "COMPLETED",
        paidAt: new Date(),
      },
    });

    await tx.rentalOrder.update({
      where: { id: payment.rentalOrderId },
      data: {
        status: "CONFIRMED",
      },
    });

    return updatedPayment;
  });
};

export const PaymentService = {
  createPaymentIntent,
  confirmPayment,
};
