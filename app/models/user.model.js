const { Sequelize, DataTypes, DATE } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull:false
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            }
        }
        
    )
    return User;
}