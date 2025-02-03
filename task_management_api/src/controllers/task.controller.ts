import { Response } from 'express';
import { Task } from '../models/task.model';
import { AuthRequest } from '../middleware/auth.middleware';
import { logger } from '../utils/logger';

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.userId
    });
    
    logger.info(`Task created: ${task.id}`);
    res.status(201).send(task);
  } catch (error) {
    logger.error('Create task error:', error);
    res.status(400).send({ error: 'Unable to create task' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.userId }
    });
    
    res.send(tasks);
  } catch (error) {
    logger.error('Get tasks error:', error);
    res.status(500).send({ error: 'Unable to fetch tasks' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    const updatedTask = await task.update(req.body);
    logger.info(`Task updated: ${task.id}`);
    
    res.send(updatedTask);
  } catch (error) {
    logger.error('Update task error:', error);
    res.status(400).send({ error: 'Unable to update task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    await task.destroy();
    logger.info(`Task deleted: ${req.params.id}`);
    
    res.send({ message: 'Task deleted successfully' });
  } catch (error) {
    logger.error('Delete task error:', error);
    res.status(500).send({ error: 'Unable to delete task' });
  }
};