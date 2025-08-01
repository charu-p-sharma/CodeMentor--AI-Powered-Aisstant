import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };

  // const secret = process.env.JWT_SECRET;
  const secret = "nnonfoehr49023jo2ekkcnznc";

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment");
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  console.log(token);

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not received" });
  }

  return new Promise<void>((resolve, reject) => {
    return jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (
        err: jwt.VerifyErrors | null,
        success: jwt.JwtPayload | string | undefined
      ) => {
        if (err) {
          reject(err.message);
          return res.status(401).json({ message: "Token Expired" });
        } else {
          console.log("Token verified successfully");
          resolve();
          res.locals.jwtData = success;
          return next();
        }
      }
    );
  });
};
