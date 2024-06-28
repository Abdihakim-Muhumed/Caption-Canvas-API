const authMiddlewares = require('./auth.middleware');
const validateMiddlewares = require('./validators.middleware')
module.exports = {
    authMiddlewares,
    validateMiddlewares
}