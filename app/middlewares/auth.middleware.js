const db = require('../models');
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const config  = require('../config/auth.config');

verifyToken = (req, res, next) => {
    const token  = req.cookies.accessToken;
    if(!token){
        res.status(403).json({
            message: "No token provided!"
        })
        return
    }
    jwt.verify(
        token,
        config.secret,
        (error, decoded) => {
            if(error){
                res.status(401).json({
                    message: "Unauthorized! Invalid token!"
                })
            }
            req.userId = decoded.indexOf;
            next();
            return;
        }
    )
}

isAdmin = (req, res, next) => {
    const id = req.cookies.userId;
    User.findByPk(id)
    .then(user => {
        if(!user){
            res.status(403).json({
                message: "Invalid User Id!"
            })
        }
        user.getRoles()
        .then(roles => {
            for(i=0; i<roles.length; i++){
                if(roles[i].name ==='admin'){
                    next()
                    return;
                }
            }
            res.status(403).json({
                message: "Unauthorized! Requires ADMIN role!"
            })
        })
        .catch( err => {
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

isContestant = (req, res, next) => {
    User.findByPk(req.cookies.userId)
    .then(user => {
        if(!user){
            res.status(403).json({
                message: "User Id not provided!"
            })
        }
        user.getRoles()
        .then( roles => {
            for(i=0; i<roles.length; i++){
                if(roles[i].name === 'contestant'){
                    next()
                    return;
                }

            }
            res.status(403).json({
                message: "Unauthorized! Requires CONTESTANT role!"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}

isCaptionOwner = (req, res, next) => {
    User.findByPk(req.cookies.userId)
    .then(user => {
        if(!user){
            res.status(403).json({
                message: "User Id not provided!"
            })
        }
        user.getCaptions()
        .then(captions => {
            for(i=0; i<captions.length; i++){
                if(captions[i].userId === user.id){
                    next()
                    return;
                }
            }
            res.status(403).json({
                message: "Unauthorized! User is not owner of the Caption!"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}

const authMiddlewares = {
    verifyToken : verifyToken,
    isAdmin: isAdmin,
    isContestant: isContestant,
    isCaptionOwner: isCaptionOwner,
}
module.exports = authMiddlewares