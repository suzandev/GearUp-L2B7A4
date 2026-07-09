import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";

const TOKEN_EXPIRES_IN: jwt.SignOptions["expiresIn"] = "7d";

const register = async (input: any) => {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    const error: any = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role.toUpperCase() as any,
      phone: input.phone,
      address: input.address,
    },
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: TOKEN_EXPIRES_IN },
  );

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  };
};

const loginUser = async (input: any) => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    const error: any = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isValid = await bcrypt.compare(input.password, user.password);
  if (!isValid) {
    const error: any = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  if (user.status === "SUSPENDED") {
    const error: any = new Error("Your account has been suspended");
    error.statusCode = 403;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: TOKEN_EXPIRES_IN },
  );

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  };
};

const me = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const error: any = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
};

export const authService = {
  register,
  loginUser,
  me,
};
