const config= require("../config/db.config")
const {Sequelize} = require("sequelize")

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect
    }

);

const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user.model')(sequelize, Sequelize)
db.role = require('./role.model')(sequelize, Sequelize)
db.caption = require('./caption.model')(sequelize, Sequelize)
db.photo = require('./photo.model')(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
    through: "user_roles",

});

db.user.belongsToMany(db.role,{
    through: "user_roles",
});

db.photo.hasMany(db.caption);
db.user.hasMany(db.caption);
db.user.hasMany(db.photo);

module.exports = db;
try{
    sequelize.authenticate();
    console.log("Connection has been established successfully!")
}
catch(err){
    console.error(err)
}