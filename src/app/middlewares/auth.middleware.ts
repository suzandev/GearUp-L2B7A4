import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
      id: string;
      role: string;
    };

    if (!decoded.id || !decoded.role) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload structures",
        errorDetails: null,
      });
    }

    (req as any).user = {
      id: decoded.id,
      role: decoded.role,
    };

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

    if (!user || !roles.includes(user.role as string)) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You do not have permission to access this resource",
        errorDetails: null,
      });
    }
    next();
  };
};
