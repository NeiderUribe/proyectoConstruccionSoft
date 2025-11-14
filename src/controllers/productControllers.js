const ProductServices = require('../services/productServices');

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

async function getProduct(req, res, next) {
    try {
        const Product = await ProductServices.getAllProduct();
        res.status(200).json({
            ok: true,
            data: Product
        });
    } catch (e) {
        console.error('Error al consultar Productos:', e.message);
        next(e);
    }
}

async function getProductById(req, res, next) {
    try {
        const Product = await ProductServices.getProductById(req.params.id);
            if (!Product) {
            return res.status(404).json({
            ok: false,
            msg: 'Producto no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            data: Product
        });
    } catch (e) {
        console.error('Error al consultar Producto:', e.message);
        next(e);
    }
}

async function updateProduct(req, res, next) {
    try {
        const updatedProduct = await ProductServices.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
        return res.status(404).json({
            ok: false,
            msg: 'Producto no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Producto actualizado exitosamente',
            data: updatedProduct
        });
    } catch (e) {
        console.error('Error al actualizar Producto:', e.message);
        next(e);
    }
}

async function deleteProduct(req, res, next) {
    try {
        const deletedProduct = await ProductServices.deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({
            ok: false,
            msg: 'Producto no encontrado'
        });
    }
        res.status(200).json({
            ok: true,
            msg: 'Producto eliminado exitosamente',
            data: deletedProduct
        });
    } catch (e) {
        console.error('Error al eliminar Producto:', e.message);
        next(e);
    }
}

module.exports = {createProduct, getProduct, getProductById, updateProduct, deleteProduct};