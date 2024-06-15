const {Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define(
        'photos',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            description: {
                type: DataTypes.STRING,
            },
            photo_url: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    )
    return Photo;
}