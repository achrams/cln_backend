require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: console.log,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },

  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: false, // jangan log query di production

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

    pool: {
      max: 3, // lebih kecil lagi biar hemat connection Neon
      min: 0,
      idle: 10000,
      acquire: 30000,
    },

    retry: {
      max: 3, // retry kalau gagal connect
    },
  },
};
