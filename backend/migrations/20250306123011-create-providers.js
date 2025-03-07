'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Providers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Refers to the Users table
          key: 'id', // The primary key in the Users table
        },
        allowNull: false,
      },
      organizationid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Organizations', // Refers to the Organizations table
          key: 'id', // The primary key in the Organizations table
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Providers');
  }
};
