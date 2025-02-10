const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuarios } = require("../models");
const { Op } = require("sequelize");

const JWT_SECRET = "TOKEN_SECRETO_ANA";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

const registro = async (req, res) => {
  try {
    const { nombre, apellido, documento, correo, contraseña, rol } = req.body;

    const usuarioExiste = await Usuarios.findOne({
      where: {
        [Op.or]: [{ correo }, { documento }],
      },
    });

    if (usuarioExiste) {
      return res.status(400).json({
        message: "Usuario o documento de identidad ya registrado",
      });
    }

    const usuario = await Usuarios.create({
      nombre,
      apellido,
      documento,
      correo,
      contraseña, 
      rol,
    });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const inicio = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
  
    const usuario = await Usuarios.findOne({ 
      where: { correo },
      attributes: ['id', 'contraseña', 'nombre', 'apellido', 'correo', 'rol'] 
    });
    
    console.log("Usuario encontrado:", usuario);
    
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    
    if (!contraseñaValida) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    
    res.cookie("token", token, cookieOptions);
    res.json({
      message: "Inicio exitoso",
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en inico:", error);
    res.status(500).json({ message: error.message });
  }
};

const cerrarSesion = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Sesion cerrada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verificarToken = async (req, res) => {
  try {

    const datosDeUsuario = {
      id: req.usuario.id,
      nombre: req.usuario.nombre,
      contraseña: req.usuario.contraseña,
      correo: req.usuario.correo,
      rol: req.usuario.rol,
    };

    res.json({ user: datosDeUsuario });
  } catch (error) {
    console.error("Error al verificar token:", error);
    res.status(500).json({ message: "Error al verificar la autenticación" });
  }
};

module.exports = {
  registro,
  inicio,
  cerrarSesion,
  verificarToken
};
