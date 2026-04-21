const { Merchant } = require("../models");

async function generateMerchantCode(cityCode, provinceCode) {
  // pastikan format
  cityCode = cityCode.toString().padStart(2, "0");
  provinceCode = provinceCode.toUpperCase();

  const prefix = `CLN${cityCode}${provinceCode}`;

  // cari merchant terakhir dengan prefix tsb
  const lastMerchant = await Merchant.findOne({
    where: {
      code: {
        [require("sequelize").Op.like]: `${prefix}%`,
      },
    },
    order: [["code", "DESC"]],
  });

  let nextNumber = 1;

  if (lastMerchant) {
    const lastCode = lastMerchant.code;
    const lastNumber = parseInt(lastCode.slice(-4));
    nextNumber = lastNumber + 1;
  }

  const uniqueId = nextNumber.toString().padStart(4, "0");

  return `${prefix}${uniqueId}`;
}

module.exports = generateMerchantCode;
