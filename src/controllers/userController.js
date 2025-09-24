const userServices = require('../services/userServices');

async function createUser(req, res, next) {
    try {
        const payload = req.body
        const newUser = await userServices.createUser(payload);
        res.status(201).json({ ok: true, data: newUser });
    }
    catch (e) {
        if (e.code === 'EMAIL_IN_USE' || e.message === 'EMAIL_IN_USE') {
            return res.status(409).json({ ok: false, message: 'Email already in use' });
        }
        next(e);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;
        const deleteUser = await userServices.deleteUserById(id);
        if (!deleteUser) return res.status(404).json({ ok: false, message: 'User not found'});
        return res.json({ ok: true, message: 'User deleted' });
    } catch (error) {
        next(error); //Esto para que sea el middleware el que lo interprete
    }
}

async function listUsers(req, res, next) {
  try {
    // simple select
    const users = await userServices.listAllUsers();
    return res.json({ ok: true, data: users });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
    return res.json({ ok: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await userServices.updateUser(id, data);
    return res.json({ ok: true, data: updated });
  } catch (e) {
    if (e.code === 'EMAIL_IN_USE') {
      return res.status(409).json({ ok: false, message: 'Email already in use' });
    }
    next(e);
  }
}

module.exports = {
    createUser,
    deleteUser,
    listUsers,
    getUser,
    updateUser
};