const { Visitantes, Apartamentos } = require('../models');

// Crear un visitante
const agregarVisitante = async (req, res) => {
    try {
        const visitante = await Visitantes.create(req.body);
        res.status(201).json(visitante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Obtener todos los visitantes
const getVisitantes = async (req, res) => {
    try {
        const visitantes = await Visitantes.findAll({
            include: [{ model: Apartamentos }]
        });
        res.json(visitantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un visitante
const getVisitantePorId = async (req, res) => {
    try {
        const visitante = await Visitantes.findByPk(req.params.id, {
            include: [{ model: Apartamentos }]
        });
        if (visitante) {
            res.json(visitante);
        } else {
            res.status(404).json({ message: 'no se a podido encontrar al visitante' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Actualizar un visitante
const editarVisitante = async (req, res) => {
    try {
        const visitante = await Visitantes.findByPk(req.params.id);
        if (visitante) {
            await visitante.update(req.body);
            res.json(visitante);
        } else {
            res.status(404).json({ message: 'no se a podido encontrar al visitante' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un visitante
const deleteVisitante = async (req, res) => {
    try {
        const visitante = await Visitantes.findByPk(req.params.id);
        if (visitante) {
            await visitante.destroy();
            res.json({ message: 'Visitante eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'no se a podido encontrar al visitante' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getVisitantes,
    getVisitantePorId,
    agregarVisitante,
    editarVisitante,
    deleteVisitante
};
