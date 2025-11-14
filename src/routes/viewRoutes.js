const express = require('express');
const router = express.Router();
const viewControllers = require('../controllers/viewControllers');

// Rutas de vistas públicas
router.get('/', viewControllers.getHome);
router.get('/login', viewControllers.getLogin);
router.get('/login/user', viewControllers.getLoginUser);
router.get('/login/admin', viewControllers.getLoginAdmin);
router.get('/register', viewControllers.getRegister);

// Rutas de acciones públicas (POST)
router.post('/register', viewControllers.postRegister);
router.post('/login/user', viewControllers.postLoginUser);
router.post('/login/admin', viewControllers.postLoginAdmin);
router.get('/logout', viewControllers.getLogout);

// Rutas de menú y pedidos (requieren autenticación de usuario)
router.get('/menu', viewControllers.getMenu);
router.get('/cart', viewControllers.getCart);
router.post('/cart/add', viewControllers.postAddToCart);
router.post('/cart/remove', viewControllers.postRemoveFromCart);
router.post('/cart/checkout', viewControllers.postCheckout);
router.get('/payment/:id', viewControllers.getPayment);
router.post('/payment', viewControllers.postPayment);
router.get('/order-success/:id', viewControllers.getOrderSuccess);

// Rutas protegidas de administrador
router.get('/admin', viewControllers.requireAdmin, viewControllers.getAdminDashboard);

// Clientes
router.get('/admin/clients', viewControllers.requireAdmin, viewControllers.getUsers);
router.get('/admin/clients/create', viewControllers.requireAdmin, viewControllers.getCreateUser);
router.get('/admin/clients/edit/:id', viewControllers.requireAdmin, viewControllers.getEditUser);
router.post('/admin/clients/create', viewControllers.requireAdmin, viewControllers.postCreateUser);
router.post('/admin/clients/edit/:id', viewControllers.requireAdmin, viewControllers.postUpdateUser);
router.post('/admin/clients/delete/:id', viewControllers.requireAdmin, viewControllers.postDeleteUser);

// Categorías
router.get('/admin/categories', viewControllers.requireAdmin, viewControllers.getCategories);
router.get('/admin/categories/create', viewControllers.requireAdmin, viewControllers.getCreateCategory);
router.get('/admin/categories/edit/:id', viewControllers.requireAdmin, viewControllers.getEditCategory);
router.post('/admin/categories/create', viewControllers.requireAdmin, viewControllers.postCreateCategory);
router.post('/admin/categories/edit/:id', viewControllers.requireAdmin, viewControllers.postUpdateCategory);
router.post('/admin/categories/delete/:id', viewControllers.requireAdmin, viewControllers.postDeleteCategory);

// Inventario
router.get('/admin/inventory', viewControllers.requireAdmin, viewControllers.getInventory);
router.get('/admin/inventory/create', viewControllers.requireAdmin, viewControllers.getCreateInventory);
router.get('/admin/inventory/edit/:id', viewControllers.requireAdmin, viewControllers.getEditInventory);
router.post('/admin/inventory/create', viewControllers.requireAdmin, viewControllers.postCreateInventory);
router.post('/admin/inventory/edit/:id', viewControllers.requireAdmin, viewControllers.postUpdateInventory);
router.post('/admin/inventory/delete/:id', viewControllers.requireAdmin, viewControllers.postDeleteInventory);

// Productos
router.get('/admin/products', viewControllers.requireAdmin, viewControllers.getProducts);
router.get('/admin/products/create', viewControllers.requireAdmin, viewControllers.getCreateProduct);
router.get('/admin/products/edit/:id', viewControllers.requireAdmin, viewControllers.getEditProduct);
router.post('/admin/products/create', viewControllers.requireAdmin, viewControllers.postCreateProduct);
router.post('/admin/products/edit/:id', viewControllers.requireAdmin, viewControllers.postUpdateProduct);
router.post('/admin/products/delete/:id', viewControllers.requireAdmin, viewControllers.postDeleteProduct);

// Pedidos
router.get('/admin/orders', viewControllers.requireAdmin, viewControllers.getOrders);

//Detalles Pedidos
router.get('/admin/orderdetail', viewControllers.requireAdmin, viewControllers.getOrderdetail);

module.exports = router;

