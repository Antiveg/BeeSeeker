'use strict'
const { Model, Sequelize } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class Provider extends Model {
        static associate(models){
            this.belongsTo(models.User, { foreignKey: 'userid' })
            this.belongsTo(models.Organization, { foreignKey: 'organizationid' })
        }
    }
    
    Provider.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
        },
        organizationid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Organizations', key: 'id' },
        }
    }, {
        sequelize,
        modelName: 'Provider'
    })

    return Provider
}