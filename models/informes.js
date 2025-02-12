module.exports = (sequelize, DataTypes) => {
    const Informes = sequelize.define('Informes', {
      asunto: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    Informes.associate = (models) => {
      Informes.belongsTo(models.Usuarios, {
          foreignKey: 'usuarioId',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      });
  };
  
  
    return Informes;
  };