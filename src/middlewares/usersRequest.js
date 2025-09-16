// src/middlewares/validateResults.js
const { validationResult } = require('express-validator');

function validateResults(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      ok: false,
      errors: errors.array().map(e => ({
        field: e.param,
        msg: e.msg
        // puedo agregar: value: e.value, location: e.location si lo deseo
      }))
    });
  }
  next();
}

module.exports = validateResults;