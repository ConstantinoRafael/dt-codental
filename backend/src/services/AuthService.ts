import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository";
import { JwtUtils } from "../utils/JwtUtils";
import { User } from "../types/User";

class AuthService {
  async authenticate(
    email: string,
    password: string
  ): Promise<{ token: string; user: Omit<User, "password"> }> {
    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = JwtUtils.generateToken({ id: user.id, email: user.email });

    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }
}

export default new AuthService();
