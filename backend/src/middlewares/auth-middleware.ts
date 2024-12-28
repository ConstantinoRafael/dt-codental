import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET || "secret";
    const decoded = jwt.verify(token, secretKey);
    req.body.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Unauthorized");
  }
};

export default authMiddleware;
