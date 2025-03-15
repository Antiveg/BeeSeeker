'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Scholarships', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      funding: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      providerid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Providers',
          key: 'id',
        },
        allowNull: false,
      },
      majorid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Majors',
          key: 'id',
        },
        allowNull: false,
      },
      educationid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Educations',
          key: 'id',
        },
        allowNull: false,
      },
      locationid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      // eligibilitycriteria: {
      //   type: Sequelize.TEXT,
      //   allowNull: true,
      // },
      // benefit: {
      //   type: Sequelize.TEXT,
      //   allowNull: true,
      // },
      // addoninfo: {
      //   type: Sequelize.TEXT,
      //   allowNull: true,
      // },
      isvisible: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      deadline: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Scholarships');
  }
};
