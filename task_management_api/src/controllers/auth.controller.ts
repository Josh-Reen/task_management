import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { config } from '../config/config';
import { logger } from '../utils/logger';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    
    const user = await User.create({
      username,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user.id }, config.jwtSecret);
    logger.info(`User registered: ${username}`);
    
    res.status(201).send({ user, token });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(400).send({ error: 'Unable to register' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('Invalid login credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret);
    logger.info(`User logged in: ${username}`);
    
    res.send({ user, token });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(400).send({ error: 'Unable to login' });
  }
};