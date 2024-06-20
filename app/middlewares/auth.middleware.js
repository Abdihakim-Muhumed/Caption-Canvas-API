const db = require('../models');
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const config  = require('../config/auth.config');

verifyToken = (req, res, next) => {
    const token  = req.headers["x-access-token"];
    if(!token){
        res.status(403).json({
            message: "No token provided!"
        })
    }
    jwt.verify(
        token,
        config.secret,
        (error, decoded) => {
            if(error){
                res.status(401).json({
                    message: "Unauthorized!"
                })
            }
            req.userId = decoded.indexOf;
            next();
            return;
        }
    )
}

isAdmin = (req, res, next) => {
    const id = req.headers["user-id"];
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
                if(roles[i].name == 'admin'){
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
        console.log(err.message)
        res.status(500).json({
            message: err.message
        })
    })
}


const authMiddlewares = {
    verifyToken : verifyToken,
    isAdmin: isAdmin,

}
module.exports = authMiddlewares