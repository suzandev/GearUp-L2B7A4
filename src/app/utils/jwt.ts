import jwt from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  email: string;
  role: string;
}

export const createToken = (payload: ITokenPayload) => {
  const expiresIn = (process.env.JWT_EXPIRES_IN ||
    "7d") as jwt.SignOptions["expiresIn"];

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn,
  });

  return token;
};
