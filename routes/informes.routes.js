const express = require("express");
const router = express.Router();
const informeController = require("../controllers/informes.controller");
const { verifyToken } = require('../middlewares/autenticacionMiddlewares');

router.get("/informes", verifyToken, informeController.getInformes);
router.get("/informes/:id", verifyToken, informeController.getInformePorId);
router.post("/informes", verifyToken, informeController.agregarInforme);
router.put("/informes/:id", verifyToken, informeController.editarInforme);
router.delete("/informes/:id", verifyToken, informeController.deleteInforme);

module.exports = router;
