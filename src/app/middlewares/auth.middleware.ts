import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
        errorDetails: null,
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
        errorDetails: null,
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        message: "JWT secret not configured",
        errorDetails: null,
      });
    }

    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload & {
      id?: string;
    };
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
        errorDetails: null,
      });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        errorDetails: null,
      });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      errorDetails: null,
    });
  }
};

export const requireRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden", errorDetails: null });
    }
    next();
  };
};
