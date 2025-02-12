const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios.controller");
const { verifyToken } = require("../middlewares/autenticacionMiddlewares");


//rutas protegidas para acceder con autenticacion de jwt
router.get("/usuarios", verifyToken, usuarioController.getUsuarios);
router.get("/propietarios", verifyToken, usuarioController.getPropietarios);
router.delete("/usuarios/:id", verifyToken, usuarioController.deleteUsuarios);

module.exports = router;