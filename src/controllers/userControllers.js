const UserServices = require('../services/userServices');
//crear usuario
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
//consular usuarios, un select *
async function getUsers(req, res, next) {
    try {
        const Users = await UserServices.getAllUsers();
        res.status(200).json({
            ok: true,
            data: Users
        });
    } catch (e) {
        console.error('Error al consultar usuarios:', e.message);
        next(e);
    }
}
//consultar usuario por id
async function getUserById(req, res, next) {
    try {
        const User = await UserServices.getUserById(req.params.id);
            if (!User) {
            return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            data: User
        });
    } catch (e) {
        console.error('Error al consultar usuario:', e.message);
        next(e);
    }
}
//Actualizar usuario
async function updateUser(req, res, next) {
    try {
        const updatedUser = await UserServices.updateUser(req.params.id, req.body);
        if (!updatedUser) {
        return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado exitosamente',
            data: updatedUser
        });
    } catch (e) {
        console.error('Error al actualizar usuario:', e.message);
        next(e);
    }
}
//Eliminar usuario
async function deleteUser(req, res, next) {
    try {
        const deletedUser = await UserServices.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado exitosamente',
            data: deletedUser
        });
    } catch (e) {
        console.error('Error al eliminar usuario:', e.message);
        next(e);
    }
}

module.exports = {createUser, getUsers, getUserById, updateUser, deleteUser};
