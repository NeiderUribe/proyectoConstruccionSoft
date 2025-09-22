const productServices = require('../services/productServices');

async function createProduct(req, res, next) {
    try {
        const payload = req.body;
        const newProduct = await productServices.createProduct(payload);
        res.status(201).json({
            ok: true,
            msg: 'Producto creado exitosamente',
            data: newProduct
        });
    }
    catch (e) {
        console.error('Error al crear Producto:', e.message);
        next(e);
    }
}
module.exports = { createProduct };