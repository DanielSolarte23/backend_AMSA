const express = require("express");
const router = express.Router();
const pagoController = require("../controllers/pagos.controller");
const { verifyToken } = require("../middlewares/autenticacionMiddlewares");


//rutas protegidas para acceder con autenticacion de jwt
router.get("/pagos", verifyToken, pagoController.getPagos);
router.get("/pagos/:id", verifyToken, pagoController.getPagoPorId);
router.post("/pagos", verifyToken, pagoController.agregarPago);
router.put("/pagos/:id", verifyToken, pagoController.editarPago);
router.delete("/pagos/:id", verifyToken, pagoController.deletePago);

module.exports = router;
