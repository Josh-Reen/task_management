import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('Tasks', 'description', {
      type: DataTypes.STRING,
      allowNull: true, // Allow null values
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('Tasks', 'description');
  },
};
