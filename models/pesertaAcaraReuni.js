const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const dataPesertaAcara = sequelize.define('peserta', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_hadir: {
        type: DataTypes.ENUM('Hadir', 'Belum Hadir'),
        allowNull: true,
        defaultValue: 'Belum Hadir'
    },
    waktu_hadir: {
        allowNull: true,
        type: DataTypes.DATE
    },
    status_pembayaran: {
        type: DataTypes.ENUM('Sudah Bayar', 'Belum Bayar'),
        allowNull: true,
        defaultValue: 'Belum Bayar'
    }
}, {
    tableName: 'peserta_acara_reuni',
    freezeTableName: false
})

module.exports = dataPesertaAcara