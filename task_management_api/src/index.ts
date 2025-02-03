import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database';
import { config } from './config/config';
import { logger } from './utils/logger';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Database sync and server start
sequelize.sync().then(() => {
  app.listen(config.port as any, '0.0.0.0', () => {
    logger.info(`Server is running on 0.0.0.0:${config.port}`);
  });
  
}).catch((error) => {
  logger.error('Unable to connect to the database:', error);
});