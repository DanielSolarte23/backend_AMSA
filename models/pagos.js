module.exports = (sequelize, DataTypes) => {
    const Pagos = sequelize.define('Pagos', {
        cantidad: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    });

    Pagos.associate = (models) => {
        Pagos.belongsTo(models.Usuarios, {
            foreignKey: 'propietarioId'
        });
    };

    return Pagos;
};