const rateLimit = require('express-rate-limit')

const requestLimiter = rateLimit({
    windowMs : 60 * 1000,
    max: 5,
    message: {
        status: 'Failed',
        message: 'Too many login attempts from this IP, please try again after a 60 second pause'
    },
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = requestLimiter;