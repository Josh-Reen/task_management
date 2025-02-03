import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

// extend the Request interface to includeuserId propert
export interface AuthRequest extends Request {
  userId?: number;
}

// Middleware function to authenticate a user
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If no token is provided fire an error
    if (!token) {
      throw new Error();
    }

    // Verify the token and extract the user ID from the payload
    const decoded = jwt.verify(token, config.jwtSecret) as { id: number };
    
    // Attach the user ID to the request object
    req.userId = decoded.id;
    
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs trigger an token invalid), send a 401 Unauthorized response
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
