const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config')
const jwt = require('jsonwebtoken');

const signUp = (req, res) => {
    User.findOne({
        where: {
            username: req.query.username
        }
    }).then(user => {
        if(user){
            res.status(403).json({
                message: 'User already registered! Sign in.'
            })
        }else{
            User.create({
                username: req.query.username,
                fullName: req.query.fullName,
                email: req.query.email,
                password: bcrypt.hashSync(req.query.password, 8)
            })
            .then( user => {
                let roles = req.query.roles;

                // Normalize roles input to an array
                if (!roles) {
                    roles = ['user'];
                } else if (typeof roles === 'string') {
                    roles = [roles]; // convert single role string to array
                }

                // Ensure 'user' role is always included
                if (!roles.includes('user')) {
                    roles.push('user');
                }
                // Find roles from DB
                Role.findAll({
                    where: {
                    name: {
                        [Op.or]: roles
                    }
                    }
                })
                    .then(foundRoles => {
                    user.setRoles(foundRoles)
                        .then(() => {
                        return res.status(201).json({
                            message: "User registration successful!"
                        });
                        })
                        .catch(err => {
                        console.error(err.message);
                        return res.status(500).json({
                            message: "Internal Server Error while setting roles."
                        });
                        });
                    })
                    .catch(err => {
                    console.error(err.message);
                    return res.status(500).json({
                        message: "Internal Server Error while retrieving roles."
                    });
                });
            })
            .catch(err => {
                console.log(err.message)
                res.status(500).json({
                    message: "Internal Server Error while creating user."
                })
            })

        }
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
            res.status(404).json({
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
                expiresIn: 86400000,
            }

        )
        let userRoles = [];
        user.getRoles()
        .then(roles => {
            for(i=0; i<roles.length; i++){
                userRoles.push("ROLE_" + roles[i].name.toUpperCase())
            }
            res.cookie(
                "accessToken",
                token,
                {
                    maxAge: 86400000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                }
            )
            res.cookie(
                "userId", 
                user.id,
                {
                    path: '/',
                    maxAge: 86400000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                }
            )
            res.status(200).json({
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                roles: userRoles,
            })
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).json({
                message: "Internal Server Error"
            })
        })
        
    })
    .catch(err => {
        console.log(err.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    })
}
const signOut = (req, res) => {
    res.clearCookie(
        "accessToken",
        {
            expires: new Date(1),
            path: '/'
        }
    )
    res.clearCookie(
        "userId",
        {
            expires: new Date(1),
            path: '/'
        }
    )
    res.status(200).send("User Logged Out!");
}
module.exports = {
    signUp,
    signIn,
    signOut
}