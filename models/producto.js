module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    estado: DataTypes.STRING,
  }, {
    tableName: 'Producto',
    timestamps: false 
  });

  Producto.associate = function(models) {
    Producto.belongsTo(models.Usuario, {
      foreignKey: 'UsuarioId',
      as: 'usuario',
    });
  };

  return Producto;
};
