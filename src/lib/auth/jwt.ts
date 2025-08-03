import jwt from 'jsonwebtoken';

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    // Для JWT
    const secret = process.env.JWT_SECRET!;
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }