const express = require('express');
const cors = require('cors');
const { db } = require('./models');
const productoRoutes = require('./routes/producto.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const authRoutes = require('./routes/auth.routes'); // <-- Importa las rutas de auth

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de productos y categorías (puedes protegerlas con middleware luego si deseas)
app.use('/api', productoRoutes);
app.use('/api', categoriaRoutes);

db.sync({ force: true }).then(() => {
  console.log('✅ Tablas sincronizadas desde cero');
  app.listen(3001, () => console.log('Servidor en puerto 3001'));
}).catch(err => console.error('Error al sincronizar:', err));