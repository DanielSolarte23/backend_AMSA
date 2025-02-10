const express = require("express");
const router = express.Router();
const visitanteController = require("../controllers/visitantes.controller");
const { verifyToken } = require("../middlewares/autenticacionMiddlewares");


router.get("/visitantes", verifyToken, visitanteController.getVisitantes);
router.get("/visitantes/:id", verifyToken, visitanteController.getVisitantePorId);
router.post("/visitantes", verifyToken, visitanteController.agregarVisitante);
router.put("/visitantes/:id", verifyToken, visitanteController.editarVisitante);
router.delete("/visitantes/:id", verifyToken, visitanteController.deleteVisitante);

module.exports = router;
