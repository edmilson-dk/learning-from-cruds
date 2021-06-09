'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      name: { 
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      email: { 
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      password: { 
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      avatar: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      bio: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
