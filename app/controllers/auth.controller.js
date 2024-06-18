const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken');

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
                        [Op.or]: req.query.roles
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
            .catch(err => {
                res.status(500).json({
                    message: err.message
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

const signIn = (req, res) => {
    User.findOne({
        where: {
            username: req.query.username
        }
    })
    .then(user => {
        if(!user){
            res.status(403).json({
                message: "Invalid username!"
            })
        }

        const passwordIsValid = bcrypt.compareSync(
            req.query.password,
            user.password
        )

        if(!passwordIsValid){
            res.status(403).json({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        const token = jwt.sign(
            {id: user.id},
            config.secret,
            {
                algorithm:'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400
            }

        )
        let userRoles = [];
        user.getRoles()
        .then(roles => {
            for(i=0; i<roles.length; i++){
                userRoles.push("ROLE_" + roles[i].name.toUpperCase())
            }
            res.status(200).json({
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                roles: userRoles,
                accessToken: token
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
        
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}
const signOut = (req, res) => {
    
}
module.exports = {
    signUp,
    signIn
}