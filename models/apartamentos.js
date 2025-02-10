module.exports = (sequelize, DataTypes) => {
    const Apartamentos = sequelize.define('Apartamentos', {
      nroApto: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      torre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estado: {
        type: DataTypes.ENUM('ocupado', 'desocupado'),
        allowNull: false,
        defaultValue: 'desocupado'
      }
    });
  
    Apartamentos.associate = (models) => {
      Apartamentos.hasMany(models.Visitantes, {
        foreignKey: 'apartamentoId'
      });
      Apartamentos.belongsTo(models.Usuarios, {
        foreignKey: 'propietarioId'
      });
    };
  
    return Apartamentos;
  };