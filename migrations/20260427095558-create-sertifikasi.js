"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sertifikasis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      pirt_url: {
        type: Sequelize.STRING,
      },
      bpom_url: {
        type: Sequelize.STRING,
      },
      halal_url: {
        type: Sequelize.STRING,
      },
      pirt_status: {
        type: Sequelize.STRING,
      },
      bpom_status: {
        type: Sequelize.STRING,
      },
      halal_status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Sertifikasis");
  },
};
