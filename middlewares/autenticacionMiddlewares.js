const jwt = require('jsonwebtoken');
const { Usuarios } = require('../models');


const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(403).json({ message: 'No estas autorizxado' });
        }

        const decoded = jwt.verify(token, 'TOKEN_SECRETO_ANA');
        const usuario = await Usuarios.findByPk(decoded.id);

        if (!usuario) {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            return res.status(401).json({ message: 'Usuario no registrado' });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return res.status(401).json({ message: 'Invalido' });
    }
};


module.exports = { verifyToken };