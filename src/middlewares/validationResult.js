const {validationResult} = require('express-validator');

function validateResults(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            ok: false,
            errors: errors.array().map(e => ({fiel: e.param, msg: e.msg}))
            });
    }
    next();
}

module.exports = { validateResults };