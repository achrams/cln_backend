"use strict";
const now = new Date();

const categories = [
  {
    name: "Workshop",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Seminar",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Exhibition",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Festival",
    createdAt: now,
    updatedAt: now,
  },
  {
    name: "Bazaar",
    createdAt: now,
    updatedAt: now,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Event_categories", categories);

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Event_categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
