'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class User extends Model {

        static associate(models){
            this.hasMany(models.UserScholarships, { foreignKey: 'userid' })
            this.hasMany(models.Provider, { foreignKey: 'userid' })
        }

    }
    
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // age: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // gender: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resume: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'User'
    })

    return User
}