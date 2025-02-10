const express = require('express');
const router = express.Router();
const apartamentoController = require('../controllers/apartamentos.controller');
const { verifyToken } = require('../middlewares/autenticacionMiddlewares');


router.get('/apartamentos', verifyToken, apartamentoController.getApartamentos);
router.get('/apartamentos/:id', verifyToken, apartamentoController.getApartamentosId);
router.post('/apartamentos', verifyToken, apartamentoController.agregarApartamento);
router.put('/apartamentos/:id', verifyToken, apartamentoController.editarApartamento);
router.delete('/apartamentos/:id', verifyToken, apartamentoController.deleteApartamento);

module.exports = router;
