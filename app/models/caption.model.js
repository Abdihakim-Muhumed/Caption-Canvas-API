const { Sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Caption = sequelize.define(
        'captions',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            body: {
                type: DataTypes.STRING,
                allowNUll: false
            },
            votes:{
                type: DataTypes.FLOAT
            }

        }
    )
    return Caption;
}