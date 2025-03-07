'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserScholarships', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
      scholarshipid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Scholarships',
          key: 'id',
        },
        allowNull: false,
      },
      resume: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isaccepted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      isvisible: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable('UserScholarships');
  }
};
