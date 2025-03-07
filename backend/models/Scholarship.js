'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {

    class Scholarship extends Model {
        static associate(models){
            this.belongsTo(models.Provider, { foreignKey: 'providerid' })
            this.belongsTo(models.Major, { foreignKey: 'majorid' })
            this.belongsTo(models.Education, { foreignKey: 'educationid' })
            this.belongsTo(models.Location, { foreignKey: 'locationid' })
        }
    }
    
    Scholarship.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        funding: {
            type: DataTypes.FLOAT
        },
        providerid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Provider', key: 'id' },
        },
        majorid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Major', key: 'id' },
        },
        educationid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Education', key: 'id' },
        },
        locationid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Location', key: 'id' },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        eligibilitycriteria: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        benefit: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        addoninfo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // createdAt sudah dibuat otomatis oleh sequelize
    }, {
        sequelize,
        modelName: 'Scholarship'
    })

    return Scholarship
}