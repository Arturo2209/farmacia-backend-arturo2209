const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME,            // nombre de la base de datos
  process.env.DB_USER,            // usuario
  process.env.DB_PASSWORD,        // contraseña
  {
    host: process.env.DB_HOST,    // host de la BD
    port: process.env.DB_PORT,    // puerto de la BD
    dialect: 'mysql',
    logging: false
  }
);

db.authenticate()
  .then(() => {
    console.log('✅ Conexión a MySQL exitosa');
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err);
  });

module.exports = db;