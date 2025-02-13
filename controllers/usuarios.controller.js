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


const createUsuario = async (req, res) => {
  try {
    const { nombre, apellido, documento, correo, contraseña, rol } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuarios.findOne({ where: { documento } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El documento ya está registrado" });
    }

    // Crear el usuario
    const usuario = await Usuarios.create({
      nombre,
      apellido,
      documento,
      correo,
      contraseña,
      rol
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, documento, correo, contraseña, rol } = req.body;

    // Buscar el usuario en la base de datos
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Inicializar un objeto con los datos a actualizar
    const datosActualizados = {
      nombre,
      apellido,
      documento,
      correo,
      rol
    };

    // Si se envía una nueva contraseña y es diferente a la actual, la hasheamos
    if (contraseña && contraseña !== usuario.contraseña) {
      const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!isMatch) {
        const salt = await bcrypt.genSalt(10);
        datosActualizados.contraseña = await bcrypt.hash(contraseña, salt);
      } else {
        datosActualizados.contraseña = usuario.contraseña; // Mantiene la misma contraseña
      }
    }

    // Actualizar solo los campos que cambiaron
    await usuario.update(datosActualizados);

    res.status(200).json({ message: "Usuario actualizado correctamente", usuario });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
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
  createUsuario,
  updateUsuario
};
