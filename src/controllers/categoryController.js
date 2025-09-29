const categoryServices = require('../services/categoryServices');

async function createCategory(req, res, next) {
    try {
        const cat = await categoryServices.createCategory(req.body);
        res.status(201).json({ ok: true, data: cat });
    } catch (e) { next(e); }
}

async function listCategories(req, res, next) {
    try { const cats = await categoryServices.listCategories(); res.json({ ok: true, data: cats }); } catch (e) { next(e); }
}

async function getCategory(req, res, next) {
    try {
        const c = await categoryServices.getCategoryById(req.params.id);
        if (!c) return res.status(404).json({ ok: false, message: 'Category not found' });
        res.json({ ok: true, data: c });
    } catch (e) { next(e); }
}

async function updateCategory(req, res, next) {
    try {
        const updated = await categoryServices.updateCategory(req.params.id, req.body);
        res.json({ ok: true, data: updated });
    } catch (e) { next(e); }
}

async function deleteCategory(req, res, next) {
    try {
        const removed = await categoryServices.deleteCategory(req.params.id);
        if (!removed) return res.status(404).json({ ok: false, message: 'Category not found' });
        res.json({ ok: true, message: 'Category deleted' });
    } catch (e) { next(e); }
}

module.exports = { createCategory, listCategories, getCategory, updateCategory, deleteCategory };