import bcrypt from "bcrypt";

import UserRepository from "../repositories/UserRepository";

export class UserService {
  async createUser(email: string, password: string) {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = UserRepository.createUser(email, hashedPassword);

    return newUser;
  }
}

export default new UserService();
