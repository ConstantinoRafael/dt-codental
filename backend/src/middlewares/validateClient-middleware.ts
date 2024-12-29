import { NextFunction, Request, Response } from "express";
import { clientSchema } from "../schemas/clients-schema";

const validateClient = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = clientSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    res.status(400).json({ message: errorDetails });
    return;
  }

  req.body = value;

  next();
};

export default validateClient;
