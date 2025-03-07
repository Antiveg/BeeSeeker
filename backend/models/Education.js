'use strict'
const { Model, Sequelize } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class Education extends Model {

        static associate(models){
            this.hasMany(models.Scholarship, { foreignKey: 'educationid' })
        }

    }
    
    Education.init({
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
        modelName: "Education",
        tableName: 'Educations'
    })

    return Education
}