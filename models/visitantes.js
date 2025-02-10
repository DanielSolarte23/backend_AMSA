module.exports = (sequelize, DataTypes) => {
    const Visitantes = sequelize.define('Visitantes', {
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
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Visitantes.associate = (models) => {
      Visitantes.belongsTo(models.Apartamentos, {
        foreignKey: 'apartamentoId'
      });
    };
  
    return Visitantes;
  };