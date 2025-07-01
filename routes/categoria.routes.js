const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriasController');
const { authMiddleware } = require('../controllers/authController');

// Protege todas las rutas de categorías
router.use(authMiddleware);

router.get('/categorias', controller.getCategorias);
router.get('/categorias/:id', controller.getCategoria);
router.post('/categorias', controller.createCategoria);
router.put('/categorias/:id', controller.updateCategoria);
router.delete('/categorias/:id', controller.deleteCategoria);

module.exports = router;