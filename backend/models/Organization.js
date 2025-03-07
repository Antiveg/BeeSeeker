'use strict'
const { Model, Sequelize } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class Organization extends Model {

        static associate(models){
            this.hasMany(models.Provider, { foreignKey: 'organizationid' })
        }

    }
    
    Organization.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Organization'
    })

    return Organization
}