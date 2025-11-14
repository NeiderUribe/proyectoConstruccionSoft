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

async function getCategory(req, res, next) {
    try {
        const Categoryt = await CategoryServices.getAllCategory();
        res.status(200).json({
            ok: true,
            data: Category
        });
    } catch (e) {
        console.error('Error al consultar la Categoria:', e.message);
        next(e);
    }
}

async function getCategoryById(req, res, next) {
    try {
        const Category = await CategoryServices.getCategoryById(req.params.id);
            if (!Category) {
            return res.status(404).json({
            ok: false,
            msg: 'Categoria no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            data: Category
        });
    } catch (e) {
        console.error('Error al consultar Categoria:', e.message);
        next(e);
    }
}

async function updateCategory(req, res, next) {
    try {
        const updatedCategory= await CategoryServices.updateCategory(req.params.id, req.body);
        if (!updatedCategory) {
        return res.status(404).json({
            ok: false,
            msg: 'Categoria no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Categoria actualizado exitosamente',
            data: updatedCategory
        });
    } catch (e) {
        console.error('Error al actualizar Categoria:', e.message);
        next(e);
    }
}

async function deleteCategory(req, res, next) {
    try {
        const deletedCategory = await CategoryServices.deleteCategory(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({
            ok: false,
            msg: 'Categoria no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Categoria eliminado exitosamente',
            data: deletedCategory
        });
    } catch (e) {
        console.error('Error al eliminar Categoria:', e.message);
        next(e);
    }
}

module.exports = {createCategory, getCategory, getCategoryById, updateCategory, deleteCategory};