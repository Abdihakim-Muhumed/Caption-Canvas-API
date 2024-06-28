const authMiddlewares = require('./auth.middleware');
const validators = require('./validate.middleware')
module.exports = {
    authMiddlewares,
    validators
}