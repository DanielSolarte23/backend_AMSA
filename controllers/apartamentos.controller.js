const { Apartamentos, Usuarios } = require('../models');

// Crear un apartamento
const agregarApartamento = async (req, res) => {
    try {
        const apartamento = await Apartamentos.create(req.body);
        res.status(201).json(apartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los apartamentos
const getApartamentos = async (req, res) => {
    try {
        const apartamentos = await Apartamentos.findAll({
            include: [{ model: Usuarios }]
        });
        res.json(apartamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getApartamentosId = async (req, res) => {
    try {
        const apartamento = await Apartamentos.findByPk(req.params.id, {
            include: [{ model: Usuarios }]
        });
        if (apartamento) {
            res.json(apartamento);
        } else {
            res.status(404).json({ message: 'Apartamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un apartamento
const editarApartamento = async (req, res) => {
    try {
        const apartamento = await Apartamentos.findByPk(req.params.id);
        if (apartamento) {
            await apartamento.update(req.body);
            res.json(apartamento);
        } else {
            res.status(404).json({ message: 'Apartamento no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un apartamento
const deleteApartamento = async (req, res) => {
    try {
        const apartamento = await Apartamentos.findByPk(req.params.id);
        if (apartamento) {
            await apartamento.destroy();
            res.json({ message: 'Apartamento eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Apartamento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getApartamentos,
    getApartamentosId,
    agregarApartamento,
    editarApartamento,
    deleteApartamento
};
