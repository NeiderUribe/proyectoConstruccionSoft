const userServices = require('../services/userServices');

async function createUser(req, res, next) {
    try{
        const payload = req.body
        const newUser = await userServices.createUser(payload);
        res.status(201).json({ok: true, data: newUser});
    }
    catch(e){
        next(e);
    }
}

module.exports = {createUser};