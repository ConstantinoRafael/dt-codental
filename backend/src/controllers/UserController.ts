import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate email and password

      const newUser = await UserService.createUser(email, password);

      res.status(201).json(newUser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new UserController();
