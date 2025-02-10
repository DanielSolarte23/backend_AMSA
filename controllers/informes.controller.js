const { Informes, Usuarios } = require('../models');

// Obtener todos los informes
const getInformes = async (req, res) => {
    try {
        const informes = await Informes.findAll({
            include: [{ model: Usuarios }]
        });
        res.json(informes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un informe por ID
const getInformePorId = async (req, res) => {
    try {
        const informe = await Informes.findByPk(req.params.id, {
            include: [{ model: Usuarios }]
        });
        if (informe) {
            res.json(informe);
        } else {
            res.status(404).json({ message: 'no se pudo encontrar el informe' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un informe
const agregarInforme = async (req, res) => {
    try {
        const informe = await Informes.create(req.body);
        res.status(201).json(informe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un informe
const editarInforme = async (req, res) => {
    try {
        const informe = await Informes.findByPk(req.params.id);
        if (informe) {
            await informe.update(req.body);
            res.json(informe);
        } else {
            res.status(404).json({ message: 'no se pudo encontrar el informe' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un informe
const deleteInforme = async (req, res) => {
    try {
        const informe = await Informes.findByPk(req.params.id);
        if (informe) {
            await informe.destroy();
            res.json({ message: 'Informes eliminado' });
        } else {
            res.status(404).json({ message: 'no se pudo encontrar el informe' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getInformes,
    getInformePorId,
    agregarInforme,
    editarInforme,
    deleteInforme
};
