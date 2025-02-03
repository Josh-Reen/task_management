import { Sequelize } from 'sequelize';
import { config } from './config';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.dbPath,
  logging: false
});