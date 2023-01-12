const { DataTypes } = require("sequelize")

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    // defino el modelo
    sequelize.define("Room", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    })

}