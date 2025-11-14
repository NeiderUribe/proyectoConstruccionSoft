const express = require('express');
const path = require('path');

const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middleware para archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Configurar sesiones
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || 'tierra-querida-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Cambiar a true en producción con HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API
const userRouters = require('./src/routes/userRoutes');
const productRouters = require('./src/routes/productRoutes');
const categoryRouters = require('./src/routes/categoryRoutes');
const inventoryRouters = require('./src/routes/inventoryRoutes');
const orderRouters = require('./src/routes/orderRoutes');
const orderdetailRouters = require('./src/routes/orderdetailRoutes');

app.use('/api/v1/users', userRouters);
app.use('/api/v1/products', productRouters);
app.use('/api/v1/categories', categoryRouters);
app.use('/api/v1/inventories', inventoryRouters);
app.use('/api/v1/orders', orderRouters);
app.use('/api/v1/orderdetails', orderdetailRouters);

// Rutas de vistas (frontend)
const viewRoutes = require('./src/routes/viewRoutes');
app.use('/', viewRoutes);

module.exports = app;