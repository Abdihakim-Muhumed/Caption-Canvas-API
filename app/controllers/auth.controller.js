const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');

const signUp = (req, res) => {
    User.create({
        username: req.query.username,
        fullName: req.query.fullName,
        email: req.query.email,
        password: bcrypt.hashSync(req.query.password, 8)
    })
    .then( user => {
        if(req.query.roles){
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.query.likes
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles)
                .then(() => {
                    res.status(201).json({
                        message: "User registration successful!"
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message
                    })
                })
            })
        }
        else{
            user.setRoles([1])
            .then(() => {
                res.status(201).json({
                    message: "User registration successful!"
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}

module.exports = {
    signUp,
}