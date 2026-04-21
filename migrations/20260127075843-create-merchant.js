"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Merchants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      legality: {
        type: Sequelize.STRING,
      },
      province_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      revenue_range: {
        type: Sequelize.STRING,
      },
      business_class: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.STRING,
      },
      ownership_type: {
        type: Sequelize.STRING,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      instagram_url: {
        type: Sequelize.STRING,
      },
      facebook_url: {
        type: Sequelize.STRING,
      },
      tiktok_url: {
        type: Sequelize.STRING,
      },
      tokopedia: {
        type: Sequelize.STRING,
      },
      shopee_url: {
        type: Sequelize.STRING,
      },
      status: {
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
    await queryInterface.dropTable("Merchants");
  },
};
