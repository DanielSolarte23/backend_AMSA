const express = require('express');
const router = express.Router();
const { registro, inicio, cerrarSesion, verificarToken } = require('../controllers/autenticacion.controller');
const { verifyToken } = require('../middlewares/autenticacionMiddlewares');

router.post('/registro', registro);
router.post('/inicio', inicio);
router.post('/cerrarSesion', verifyToken, cerrarSesion);
router.get('/verify', verifyToken, verificarToken);

module.exports = router;
