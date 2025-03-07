'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class UserScholarships extends Model {
        static associate(models){
            UserScholarships.belongsTo(models.User, { foreignKey: 'userid' })
            UserScholarships.belongsTo(models.Scholarship, { foreignKey: 'scholarshipid' })
        }
    }
    
    UserScholarships.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'User', key: 'id' },
        },
        scholarshipid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Scholarship', key: 'id' },
        },
        resume: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isaccepted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
        isvisible: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
    }, {
        sequelize,
        modelName: 'UserScholarships'
    })

    return UserScholarships
}