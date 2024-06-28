const {query, validationResult} = require('express-validator')
 
validateAuth = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            errors: errors.array()[0].msg
        })
        return;  
    }
    next();
}

const validators = {
    validateAuth: validateAuth
}
module.exports = validators