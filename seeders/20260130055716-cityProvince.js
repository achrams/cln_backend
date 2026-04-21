"use strict";
const provinces = require("../cityProvinces");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const provs = provinces.map((el) => ({
      province: el.province,
      code: el.code,
      createdAt: now,
      updatedAt: now,
    }));

    // insert province dulu
    await queryInterface.bulkInsert("Provinces", provs);

    // ambil province dari DB buat mapping id
    const provinceRows = await queryInterface.sequelize.query(
      `SELECT id, code FROM "Provinces"`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    const provinceMap = {};
    provinceRows.forEach((p) => {
      provinceMap[p.code] = p.id;
    });

    const cities = [];

    provinces.forEach((prov) => {
      prov.cities.forEach((city) => {
        cities.push({
          city: city.city,
          code: city.code,
          province_id: provinceMap[prov.code],
          createdAt: now,
          updatedAt: now,
        });
      });
    });

    await queryInterface.bulkInsert("Cities", cities);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cities", null, {});
    await queryInterface.bulkDelete("Provinces", null, {});
  },
};
