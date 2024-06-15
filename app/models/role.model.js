const { Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define(
        'roles',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    )
    return Role;
}