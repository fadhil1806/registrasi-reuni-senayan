'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('peserta_acara_reuni', {
      id: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(75),
        allowNull: false
      },
      status_hadir: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'Belum Hadir'
      },
      status_pembayaran: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'Belum Bayar'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Menghapus tabel dan tipe ENUM
    await queryInterface.dropTable('peserta_acara_reuni');
  }
};
