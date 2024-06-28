const {query, validatioResult} = require('express-validator')
 
const validateAuth = (req, res) => {
    query('username').isAlphanumeric()
    query('email').isEmail()
    query('password').isAlphanumeric()
    query('fullName').isString()
    const errors = validatioResult(req)
    if(!errors){
        res.status(400).json({
            errors: errors.array()
        })
    }
    next()
}

const validators = {
    validateAuth: validateAuth
}
module.exports = validateAuth