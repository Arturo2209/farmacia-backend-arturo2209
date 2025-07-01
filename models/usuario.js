const { DataTypes } = require('sequelize');
const db = require('../db'); // IMPORTA DIRECTO DE db.js

const Usuario = db.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;