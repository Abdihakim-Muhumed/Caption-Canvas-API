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
                res.status(403).json({
                    message: "Unauthorized!"
                })
            }
            req.userId = decoded.indexOf;
            next();
        }
    )
}

const authMiddlewares = {
    verifyToken : verifyToken,

}
module.exports = authMiddlewares