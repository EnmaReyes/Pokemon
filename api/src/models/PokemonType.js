const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Type",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID, 
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, //SE VAN A CREAR AUTOMATICAMENTE
        // type: DataTypes.INTEGER,
        // allowNull: false,
        // primaryKey: true,
        // autoIncrement: true,
      }
    },
    {
      timestamps: false,
    }
  );
};