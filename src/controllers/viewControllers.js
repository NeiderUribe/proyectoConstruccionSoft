const UserServices = require('../services/userServices');
const CategoryServices = require('../services/categoryServices');
const InventoryServices = require('../services/inventoryServices');
const ProductServices = require('../services/productServices');
const OrderServices = require('../services/orderServices');
const { validationResult } = require('express-validator');

// Middleware para verificar si es administrador
function requireAdmin(req, res, next) {
    if (req.session && req.session.isAdmin) {
        return next();
    }
    res.redirect('/login/admin?error=' + encodeURIComponent('Debes iniciar sesión como administrador'));
}

// Página de inicio
async function getHome(req, res) {
    try {
        res.render('index', { title: 'Tierra Querida - Inicio' });
    } catch (error) {
        console.error('Error al cargar página de inicio:', error);
        res.status(500).render('error', { message: 'Error al cargar la página' });
    }
}

// Página de login (opciones)
async function getLogin(req, res) {
    try {
        res.render('login', { 
            title: 'Iniciar Sesión',
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar página de login:', error);
        res.status(500).render('error', { message: 'Error al cargar la página' });
    }
}

// Página de login usuario
async function getLoginUser(req, res) {
    try {
        res.render('loginUser', { 
            title: 'Login Usuario',
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar página de login usuario:', error);
        res.status(500).render('error', { message: 'Error al cargar la página' });
    }
}

// Página de login administrador
async function getLoginAdmin(req, res) {
    try {
        res.render('loginAdmin', { 
            title: 'Login Administrador',
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar página de login admin:', error);
        res.status(500).render('error', { message: 'Error al cargar la página' });
    }
}

// Procesar login usuario
async function postLoginUser(req, res) {
    try {
        const { mail, password } = req.body;
        const user = await UserServices.getUserByEmail(mail);
        
        if (!user || user.password !== password) {
            return res.redirect('/login/user?error=' + encodeURIComponent('Credenciales incorrectas'));
        }

        req.session.userId = user.id_user;
        req.session.userName = user.name;
        req.session.isUser = true;
        
        // Generar token JWT
        const { generateToken } = require('../middlewares/authMiddleware');
        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        
        res.redirect('/menu?success=' + encodeURIComponent('Bienvenido ' + user.name));
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.redirect('/login/user?error=' + encodeURIComponent('Error al iniciar sesión'));
    }
}

// Procesar login administrador
async function postLoginAdmin(req, res) {
    try {
        const { mail, password } = req.body;
        
        // Credenciales del administrador
        if (mail === 'laura@gmail.com' && password === '1234') {
            req.session.isAdmin = true;
            req.session.adminName = 'Laura';
            req.session.adminEmail = mail;
            
            // Generar token JWT
            const { generateToken } = require('../middlewares/authMiddleware');
            const token = generateToken({ id: 0, mail, name: 'Laura', isAdmin: true });
            res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            
            res.redirect('/admin');
        } else {
            res.redirect('/login/admin?error=' + encodeURIComponent('Credenciales de administrador incorrectas'));
        }
    } catch (error) {
        console.error('Error al iniciar sesión admin:', error);
        res.redirect('/login/admin?error=' + encodeURIComponent('Error al iniciar sesión'));
    }
}

// Logout
async function getLogout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.clearCookie('token');
        res.redirect('/');
    });
}

// Panel de administrador
async function getAdminDashboard(req, res) {
    try {
        res.render('adminDashboard', { 
            title: 'Panel de Administrador',
            adminName: req.session.adminName || 'Administrador',
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar panel admin:', error);
        res.status(500).render('error', { message: 'Error al cargar el panel' });
    }
}

// Página de registro
async function getRegister(req, res) {
    try {
        res.render('register', { 
            title: 'Registrarse',
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar página de registro:', error);
        res.status(500).render('error', { message: 'Error al cargar la página' });
    }
}

// Procesar registro
async function postRegister(req, res) {
    try {
        const { name, mail, password, confirmPassword, cellular, address } = req.body;
        
        // Validaciones básicas
        if (password !== confirmPassword) {
            return res.redirect('/register?error=' + encodeURIComponent('Las contraseñas no coinciden'));
        }

        if (password.length < 6) {
            return res.redirect('/register?error=' + encodeURIComponent('La contraseña debe tener al menos 6 caracteres'));
        }

        const newUser = await UserServices.createUser({
            name,
            mail,
            password,
            cellular: cellular || '',
            address: address || ''
        });

        // Iniciar sesión automáticamente después del registro
        req.session.userId = newUser.insertId || newUser.id_user;
        req.session.userName = name;
        req.session.isUser = true;
        
        // Generar token JWT
        const { generateToken } = require('../middlewares/authMiddleware');
        const token = generateToken({ id_user: newUser.insertId || newUser.id_user, mail, name, isAdmin: false });
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        
        res.redirect('/menu?success=' + encodeURIComponent('Usuario registrado exitosamente. Ahora puedes hacer tu pedido.'));
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.redirect('/register?error=' + encodeURIComponent(error.message || 'Error al registrar usuario'));
    }
}

// Lista de clientes (CRUD) - Solo admin
async function getUsers(req, res) {
    try {
        const users = await UserServices.getAllUsers();
        res.render('clients', { 
            title: 'Gestión de Clientes',
            users: users || [],
            error: req.query.error || null,
            success: req.query.success || null,
            isAdmin: true
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        res.status(500).render('error', { message: 'Error al cargar clientes' });
    }
}

// Formulario de crear usuario
async function getCreateUser(req, res) {
    try {
        res.render('userForm', { 
            title: 'Crear Usuario',
            user: null,
            action: '/admin/clients/create',
            error: req.query.error || null,
            isAdmin: true
        });
    } catch (error) {
        console.error('Error al cargar formulario:', error);
        res.status(500).render('error', { message: 'Error al cargar el formulario' });
    }
}

// Procesar creación de usuario
async function postCreateUser(req, res) {
    try {
        const { name, mail, password, cellular, address } = req.body;
        
        await UserServices.createUser({
            name,
            mail,
            password,
            cellular: cellular || '',
            address: address || ''
        });

        res.redirect('/admin/clients?success=' + encodeURIComponent('Cliente creado exitosamente'));
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.redirect('/admin/clients/create?error=' + encodeURIComponent(error.message || 'Error al crear cliente'));
    }
}

// Formulario de editar usuario
async function getEditUser(req, res) {
    try {
        const user = await UserServices.getUserById(req.params.id);
        if (!user) {
            return res.redirect('/admin/clients?error=' + encodeURIComponent('Cliente no encontrado'));
        }
        res.render('userForm', { 
            title: 'Editar Usuario',
            user: user,
            action: `/admin/clients/edit/${req.params.id}`,
            error: req.query.error || null,
            isAdmin: true
        });
    } catch (error) {
        console.error('Error al cargar usuario:', error);
        res.redirect('/admin/clients?error=' + encodeURIComponent('Error al cargar cliente'));
    }
}

// Procesar actualización de usuario
async function postUpdateUser(req, res) {
    try {
        const { name, mail, password, cellular, address } = req.body;
        const updateData = { name, mail, cellular, address };
        
        if (password && password.length > 0) {
            updateData.password = password;
        }

        await UserServices.updateUser(req.params.id, updateData);
        res.redirect('/admin/clients?success=' + encodeURIComponent('Cliente actualizado exitosamente'));
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.redirect(`/admin/clients/edit/${req.params.id}?error=` + encodeURIComponent(error.message || 'Error al actualizar cliente'));
    }
}

// Procesar eliminación de usuario
async function postDeleteUser(req, res) {
    try {
        await UserServices.deleteUser(req.params.id);
        res.redirect('/admin/clients?success=' + encodeURIComponent('Cliente eliminado exitosamente'));
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.redirect('/admin/clients?error=' + encodeURIComponent(error.message || 'Error al eliminar cliente'));
    }
}

// ========== CATEGORÍAS ==========
async function getCategories(req, res) {
    try {
        const categories = await CategoryServices.getAllCategories();
        res.render('categories', { 
            title: 'Gestión de Categorías',
            categories: categories || [],
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar categorías:', error);
        res.status(500).render('error', { message: 'Error al cargar categorías' });
    }
}

async function getCreateCategory(req, res) {
    try {
        res.render('categoryForm', { 
            title: 'Crear Categoría',
            category: null,
            action: '/admin/categories/create',
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Error al cargar formulario:', error);
        res.status(500).render('error', { message: 'Error al cargar el formulario' });
    }
}

async function postCreateCategory(req, res) {
    try {
        const { name, description } = req.body;
        await CategoryServices.createCategory({ name, description });
        res.redirect('/admin/categories?success=' + encodeURIComponent('Categoría creada exitosamente'));
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.redirect('/admin/categories/create?error=' + encodeURIComponent(error.message || 'Error al crear categoría'));
    }
}

async function getEditCategory(req, res) {
    try {
        const category = await CategoryServices.getCategoryById(req.params.id);
        if (!category) {
            return res.redirect('/admin/categories?error=' + encodeURIComponent('Categoría no encontrada'));
        }
        res.render('categoryForm', { 
            title: 'Editar Categoría',
            category: category,
            action: `/admin/categories/edit/${req.params.id}`,
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Error al cargar categoría:', error);
        res.redirect('/admin/categories?error=' + encodeURIComponent('Error al cargar categoría'));
    }
}

async function postUpdateCategory(req, res) {
    try {
        const { name, description } = req.body;
        await CategoryServices.updateCategory(req.params.id, { name, description });
        res.redirect('/admin/categories?success=' + encodeURIComponent('Categoría actualizada exitosamente'));
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.redirect(`/admin/categories/edit/${req.params.id}?error=` + encodeURIComponent(error.message || 'Error al actualizar categoría'));
    }
}

async function postDeleteCategory(req, res) {
    try {
        await CategoryServices.deleteCategory(req.params.id);
        res.redirect('/admin/categories?success=' + encodeURIComponent('Categoría eliminada exitosamente'));
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        res.redirect('/admin/categories?error=' + encodeURIComponent(error.message || 'Error al eliminar categoría'));
    }
}

// ========== INVENTARIO ==========
async function getInventory(req, res) {
    try {
        const inventory = await InventoryServices.getAllInventory();
        res.render('inventory', { 
            title: 'Gestión de Inventario',
            inventory: inventory || [],
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar inventario:', error);
        res.status(500).render('error', { message: 'Error al cargar inventario' });
    }
}

async function getCreateInventory(req, res) {
    try {
        const categories = await CategoryServices.getAllCategories();
        res.render('inventoryForm', { 
            title: 'Crear Item de Inventario',
            item: null,
            categories: categories || [],
            action: '/admin/inventory/create',
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Error al cargar formulario:', error);
        res.status(500).render('error', { message: 'Error al cargar el formulario' });
    }
}

async function postCreateInventory(req, res) {
    try {
        const { name, description, amount, category_id, price, unit_measurement } = req.body;
        await InventoryServices.createInventory({ name, description, amount, category_id, price, unit_measurement });
        res.redirect('/admin/inventory?success=' + encodeURIComponent('Item de inventario creado exitosamente'));
    } catch (error) {
        console.error('Error al crear inventario:', error);
        res.redirect('/admin/inventory/create?error=' + encodeURIComponent(error.message || 'Error al crear inventario'));
    }
}

async function getEditInventory(req, res) {
    try {
        const [item, categories] = await Promise.all([
            InventoryServices.getInventoryById(req.params.id),
            CategoryServices.getAllCategories()
        ]);
        if (!item) {
            return res.redirect('/admin/inventory?error=' + encodeURIComponent('Item no encontrado'));
        }
        res.render('inventoryForm', { 
            title: 'Editar Item de Inventario',
            item: item,
            categories: categories || [],
            action: `/admin/inventory/edit/${req.params.id}`,
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Error al cargar inventario:', error);
        res.redirect('/admin/inventory?error=' + encodeURIComponent('Error al cargar inventario'));
    }
}

async function postUpdateInventory(req, res) {
    try {
        const { name, description, amount, category_id, price, unit_measurement } = req.body;
        await InventoryServices.updateInventory(req.params.id, { name, description, amount, Id_category: category_id, price, unit_measurement });
        res.redirect('/admin/inventory?success=' + encodeURIComponent('Item actualizado exitosamente'));
    } catch (error) {
        console.error('Error al actualizar inventario:', error);
        res.redirect(`/admin/inventory/edit/${req.params.id}?error=` + encodeURIComponent(error.message || 'Error al actualizar inventario'));
    }
}

async function postDeleteInventory(req, res) {
    try {
        await InventoryServices.deleteInventory(req.params.id);
        res.redirect('/admin/inventory?success=' + encodeURIComponent('Item eliminado exitosamente'));
    } catch (error) {
        console.error('Error al eliminar inventario:', error);
        res.redirect('/admin/inventory?error=' + encodeURIComponent(error.message || 'Error al eliminar inventario'));
    }
}

// ========== PRODUCTOS ==========
async function getProducts(req, res) {
    try {
        const products = await ProductServices.getAllProducts();
        res.render('products', { 
            title: 'Gestión de Productos',
            products: products || [],
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        res.status(500).render('error', { message: 'Error al cargar productos' });
    }
}

async function getCreateProduct(req, res) {
    try {
        const inventory = await InventoryServices.getAllInventory();
        res.render('productForm', { 
            title: 'Crear Producto',
            product: null,
            inventory: inventory || [],
            action: '/admin/products/create',
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Error al cargar formulario:', error);
        res.status(500).render('error', { message: 'Error al cargar el formulario' });
    }
}

async function postCreateProduct(req, res) {
    try {
        const { id_inventory, name, description, price, image } = req.body;
        await ProductServices.createProduct({ Id_inventory: id_inventory, name, description, price, image: image || null });
        res.redirect('/admin/products?success=' + encodeURIComponent('Producto creado exitosamente'));
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.redirect('/admin/products/create?error=' + encodeURIComponent(error.message || 'Error al crear producto'));
    }
}

async function getEditProduct(req, res) {
    try {
        const [product, inventory] = await Promise.all([
            ProductServices.getProductById(req.params.id),
            InventoryServices.getAllInventory()
        ]);
        if (!product) {
            return res.redirect('/admin/products?error=' + encodeURIComponent('Producto no encontrado'));
        }
        res.render('productForm', { 
            title: 'Editar Producto',
            product: product,
            inventory: inventory || [],
            action: `/admin/products/edit/${req.params.id}`,
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Error al cargar producto:', error);
        res.redirect('/admin/products?error=' + encodeURIComponent('Error al cargar producto'));
    }
}

async function postUpdateProduct(req, res) {
    try {
        const { id_inventory, name, description, price, image } = req.body;
        await ProductServices.updateProduct(req.params.id, { id_inventory, name, description, price, image: image || null });
        res.redirect('/admin/products?success=' + encodeURIComponent('Producto actualizado exitosamente'));
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.redirect(`/admin/products/edit/${req.params.id}?error=` + encodeURIComponent(error.message || 'Error al actualizar producto'));
    }
}

async function postDeleteProduct(req, res) {
    try {
        await ProductServices.deleteProduct(req.params.id);
        res.redirect('/admin/products?success=' + encodeURIComponent('Producto eliminado exitosamente'));
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.redirect('/admin/products?error=' + encodeURIComponent(error.message || 'Error al eliminar producto'));
    }
}

// ========== MENÚ Y PEDIDOS (USUARIOS) ==========
async function getMenu(req, res) {
    try {
        const { isAuthenticated } = require('../middlewares/authMiddleware');
        if (!req.session || !req.session.userId) {
            return res.redirect('/login/user?error=' + encodeURIComponent('Debes iniciar sesión para ver el menú'));
        }
        
        const products = await ProductServices.getAllProducts();
        res.render('menu', { 
            title: 'Menú - Tierra Querida',
            products: products || [],
            userId: req.session.userId,
            userName: req.session.userName,
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar menú:', error);
        res.status(500).render('error', { message: 'Error al cargar el menú' });
    }
}

async function getCart(req, res) {
    try {
        if (!req.session || !req.session.userId) {
            return res.redirect('/login/user?error=' + encodeURIComponent('Debes iniciar sesión'));
        }
        
        const cart = req.session.cart || [];
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.subtotal);
        });
        
        res.render('cart', { 
            title: 'Carrito de Compras',
            cart: cart,
            total: total,
            userId: req.session.userId,
            userName: req.session.userName
        });
    } catch (error) {
        console.error('Error al cargar carrito:', error);
        res.status(500).render('error', { message: 'Error al cargar el carrito' });
    }
}

async function postAddToCart(req, res) {
    try {
        if (!req.session || !req.session.userId) {
            return res.redirect('/login/user?error=' + encodeURIComponent('Debes iniciar sesión'));
        }
        
        const { product_id, quantity } = req.body;
        const product = await ProductServices.getProductById(product_id);
        
        if (!product) {
            return res.redirect('/menu?error=' + encodeURIComponent('Producto no encontrado'));
        }
        
        if (!req.session.cart) {
            req.session.cart = [];
        }
        
        const existingItem = req.session.cart.find(item => item.product_id == product_id);
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
            existingItem.subtotal = existingItem.quantity * parseFloat(product.price);
        } else {
            req.session.cart.push({
                product_id: product.id_Product,
                product_name: product.name,
                product_price: parseFloat(product.price),
                quantity: parseInt(quantity),
                subtotal: parseInt(quantity) * parseFloat(product.price),
                image: product.image
            });
        }
        
        res.redirect('/menu?success=' + encodeURIComponent('Producto agregado al carrito'));
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.redirect('/menu?error=' + encodeURIComponent('Error al agregar producto'));
    }
}

async function postRemoveFromCart(req, res) {
    try {
        const { index } = req.body;
        if (req.session.cart && req.session.cart[index]) {
            req.session.cart.splice(index, 1);
        }
        res.redirect('/cart');
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        res.redirect('/cart?error=' + encodeURIComponent('Error al eliminar producto'));
    }
}

async function postCheckout(req, res) {
    try {
        if (!req.session || !req.session.userId || !req.session.cart || req.session.cart.length === 0) {
            return res.redirect('/cart?error=' + encodeURIComponent('El carrito está vacío'));
        }
        
        const total = req.session.cart.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
        
        // Crear pedido
        const order = await OrderServices.createOrder({
            Id_user: req.session.userId,
            total: total
        });
        
        const orderId = order.insertId;
        
        // Crear detalles del pedido
        const OrderDetailServices = require('../services/orderdetailServices');
        for (const item of req.session.cart) {
            await OrderDetailServices.createOrderdetail({
                id_order: orderId,
                id_product: item.product_id,
                amount: item.quantity,
                unit_price: item.product_price,
                subtotal: item.subtotal
            });
        }
        
        // Limpiar carrito
        req.session.cart = [];
        
        // Redirigir a Mercado Pago
        res.redirect(`/payment/${orderId}`);
    } catch (error) {
        console.error('Error al procesar pedido:', error);
        res.redirect('/cart?error=' + encodeURIComponent('Error al procesar pedido'));
    }
}

async function getPayment(req, res) {
    try {
        const { id } = req.params;
        const order = await OrderServices.getOrderById(id);
        
        if (!order || order.id_user != req.session.userId) {
            return res.redirect('/menu?error=' + encodeURIComponent('Pedido no encontrado'));
        }
        
        res.render('payment', { 
            title: 'Pago - Mercado Pago',
            order: order,
            userId: req.session.userId
        });
    } catch (error) {
        console.error('Error al cargar pago:', error);
        res.status(500).render('error', { message: 'Error al cargar el pago' });
    }
}

async function postPayment(req, res) {
    try {
        const { order_id } = req.body;
        const order = await OrderServices.getOrderById(order_id);
        
        if (!order) {
            return res.redirect('/menu?error=' + encodeURIComponent('Pedido no encontrado'));
        }
        
        // Integración con Mercado Pago
        const { MercadoPagoConfig, Payment } = require('mercadopago');
        
        const client = new MercadoPagoConfig({ 
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-ACCESS-TOKEN',
            options: { timeout: 5000 }
        });
        
        const payment = new Payment(client);
        
        const paymentData = {
            transaction_amount: parseFloat(order.total),
            description: `Pedido #${order.id_order} - Tierra Querida`,
            payment_method_id: 'pix', // o 'credit_card', 'debit_card', etc.
            payer: {
                email: req.session.userEmail || 'test@test.com'
            }
        };
        
        // En producción, procesar el pago real
        // const result = await payment.create({ body: paymentData });
        
        res.redirect(`/order-success/${order_id}`);
    } catch (error) {
        console.error('Error al procesar pago:', error);
        res.redirect(`/payment/${order_id}?error=` + encodeURIComponent('Error al procesar pago'));
    }
}

async function getOrderSuccess(req, res) {
    try {
        const { id } = req.params;
        const order = await OrderServices.getOrderById(id);
        
        res.render('orderSuccess', { 
            title: 'Pedido Exitoso',
            order: order,
            userName: req.session.userName
        });
    } catch (error) {
        console.error('Error al cargar éxito:', error);
        res.status(500).render('error', { message: 'Error' });
    }
}

// ========== PEDIDOS (ADMIN) ==========
async function getOrders(req, res) {
    try {
        const orders = await OrderServices.getAllOrders();
        res.render('orders', { 
            title: 'Gestión de Pedidos',
            orders: orders || [],
            error: req.query.error || null,
            success: req.query.success || null
        });
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
        res.status(500).render('error', { message: 'Error al cargar pedidos' });
    }
}

module.exports = {
    requireAdmin,
    getHome,
    getLogin,
    getLoginUser,
    getLoginAdmin,
    postLoginUser,
    postLoginAdmin,
    getLogout,
    getAdminDashboard,
    getRegister,
    postRegister,
    getUsers,
    getCreateUser,
    postCreateUser,
    getEditUser,
    postUpdateUser,
    postDeleteUser,
    // Categorías
    getCategories,
    getCreateCategory,
    postCreateCategory,
    getEditCategory,
    postUpdateCategory,
    postDeleteCategory,
    // Inventario
    getInventory,
    getCreateInventory,
    postCreateInventory,
    getEditInventory,
    postUpdateInventory,
    postDeleteInventory,
    // Productos
    getProducts,
    getCreateProduct,
    postCreateProduct,
    getEditProduct,
    postUpdateProduct,
    postDeleteProduct,
    // Pedidos Admin
    getOrders,
    // Menú y Pedidos Usuario
    getMenu,
    getCart,
    postAddToCart,
    postRemoveFromCart,
    postCheckout,
    getPayment,
    postPayment,
    getOrderSuccess
};
