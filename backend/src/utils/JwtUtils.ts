import jwt from "jsonwebtoken";

export class JwtUtils {
  static generateToken(payload: any): string {
    const secret = process.env.JWT_SECRET || "secret";
    return jwt.sign(payload, secret, {
      expiresIn: "1d",
    });
  }

  static verifyToken(token: string): any {
    const secret = process.env.JWT_SECRET || "secret";
    return jwt.verify(token, secret);
  }
}
