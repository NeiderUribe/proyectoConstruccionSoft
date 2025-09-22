const CategoryServices = require('../services/categoryServices');

async function createCategory(req, res, next) {
    try {
        const payload = req.body;
        const newCategory= await CategoryServices.createCategory(payload);
        res.status(201).json({
            ok: true,
            msg: 'Categoria creada exitosamente',
            data: newCategory
        });
    }
    catch (e) {
        console.error('Error al crear Categoria:', e.message);
        next(e);
    }
}
module.exports = { createCategory };