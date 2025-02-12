const { Usuarios } = require("../models");
const bcrypt = require("bcryptjs");

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropietarios = async (req, res) => {
  try {
      const propietarios = await Usuarios.findAll({
          where: { rol: "propietario" }
      });

      if (propietarios.length === 0) {
          return res.status(404).json({ message: "No se encontraron propietarios" });
      }

      res.json(propietarios);
  } catch (error) {
      console.error("Error al obtener propietarios:", error);
      res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar un usuario
const deleteUsuarios = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuarios no encontrado" });
    }

    await usuario.destroy();
    res.json({ message: "Usuarios eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsuarios,
  deleteUsuarios,
  getPropietarios,
};
