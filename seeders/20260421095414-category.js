"use strict";
const cats = [
  {
    name: "AKSESORIS",
  },
  {
    name: "CRAFT",
  },
  {
    name: "F&B",
  },
  {
    name: "FASHION",
  },
  {
    name: "FURNITURE",
  },
  {
    name: "WASTRA",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const categories = cats;
    cats.forEach((el) => {
      ((el.createdAt = now), (el.updatedAt = now));
    });

    await queryInterface.bulkInsert("Categories", categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
