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

async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;
        const deleteUser = await userServices.deleteUserById(id);
        if(!deleteUser) return res.status(404).json({ok: false, message: 'Usuario no encontrado'});
    } catch (error) {
        next(error); //Esto para que sea el middleware el que lo interprete
    }
}

module.exports = {
    createUser,
    deleteUser
};