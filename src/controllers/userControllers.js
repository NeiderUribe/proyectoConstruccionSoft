const UserServices = require('../services/userServices');

async function createUser(req, res, next) {
    try {
        const payload = req.body;
        const newUser = await UserServices.createUser(payload);
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            data: newUser
        });
    }
    catch (e) {
        console.error('Error al crear Usuario:', e.message);
        next(e);
    }
}
module.exports = { createUser };