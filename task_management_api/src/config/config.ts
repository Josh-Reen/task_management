import dotenv from 'dotenv';

dotenv.config();

// config files and root of data mapping
export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  dbPath: process.env.DB_PATH || './database.sqlite',
  logLevel: process.env.LOG_LEVEL || 'info'
};