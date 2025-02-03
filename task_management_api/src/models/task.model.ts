import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';

export interface TaskAttributes {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
  status: string;  
}

export class Task extends Model<TaskAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description?: string;  
  public completed!: boolean;
  public userId!: number;
  public status!: string;  
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,   
    allowNull: true           
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    field: 'userId'
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'Tasks'
});

// Define the association after both models are initialized
Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

export default Task;
