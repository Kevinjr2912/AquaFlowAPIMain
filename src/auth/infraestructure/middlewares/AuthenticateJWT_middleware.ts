import { NextFunction, Request, Response } from "express";
import { JWTVerifyToken } from "../../application/services/JWTVerifyToken";

export const authenticateJWT = (authService: JWTVerifyToken) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      await authService.execute(token);
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

  }
}