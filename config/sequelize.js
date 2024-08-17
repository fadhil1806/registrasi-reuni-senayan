const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  port: 5432, // Port default PostgreSQL
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Hanya diperlukan jika Anda tidak memiliki sertifikat SSL yang valid
    }
  },
  pool: {
    max: 5, // Maksimum koneksi dalam pool
    min: 0, // Minimum koneksi dalam pool
    acquire: 30000, // Timeout untuk mendapatkan koneksi (ms)
    idle: 10000 // Timeout untuk koneksi yang tidak digunakan (ms)
  },
});

// Tes koneksi ke database
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;