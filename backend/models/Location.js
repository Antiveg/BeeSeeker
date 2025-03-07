'use strict'
const { Model, Sequelize } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class Location extends Model {

        static associate(models){
            this.hasMany(models.Scholarship, { foreignKey: 'locationid' })
        }

    }
    
    Location.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Location'
    })

    return Location
}