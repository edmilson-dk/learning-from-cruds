'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
      },
      title: { 
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      author: { 
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      released: { 
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      pages_total: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      image_name: { 
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      likes: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      dislikes: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};
