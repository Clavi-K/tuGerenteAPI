const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  // defino el modelo
  sequelize.define('Reservation', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

};