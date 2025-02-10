const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define('Usuarios', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        documento: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: DataTypes.ENUM('administrador', 'vigilante', 'propietario'),
            allowNull: false
        }
    });

    Usuarios.beforeCreate(async (usuario) => {
        const salt = await bcrypt.genSalt(10);
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
    });

      Usuarios.associate = (models) => {
        Usuarios.hasMany(models.Informes, {
          foreignKey: 'usuarioId'
        });
      };

    return Usuarios;
};
