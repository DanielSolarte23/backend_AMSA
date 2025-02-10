const { Pagos, Usuarios } = require('../models');



// Crear un pago
const agregarPago = async (req, res) => {
    try {
        const pago = await Pagos.create(req.body);
        res.status(201).json(pago);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los pagos
const getPagos = async (req, res) => {
    try {
        const pagos = await Pagos.findAll({
            include: [{ model: Usuarios }]
        });
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un pago por ID
const getPagoPorId = async (req, res) => {
    try {
        const pago = await Pagos.findByPk(req.params.id, {
            include: [{ model: Usuarios }]
        });
        if (pago) {
            res.json(pago);
        } else {
            res.status(404).json({ message: 'Pagos no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un pago
const editarPago = async (req, res) => {
    try {
        const pago = await Pagos.findByPk(req.params.id);
        if (pago) {
            await pago.update(req.body);
            res.json(pago);
        } else {
            res.status(404).json({ message: 'Pagos no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un pago
const deletePago = async (req, res) => {
    try {
        const pago = await Pagos.findByPk(req.params.id);
        if (pago) {
            await pago.destroy();
            res.json({ message: 'Pagos eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Pagos no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPagos,
    getPagoPorId,
    agregarPago,
    editarPago,
    deletePago
};
