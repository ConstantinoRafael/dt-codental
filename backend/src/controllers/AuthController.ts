import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      //validate request body

      const result = await AuthService.authenticate(email, password);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  }
}

export default new AuthController();
