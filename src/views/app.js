const express = require('express');
const userRouters = require('../routes/userRoutes');
const productRouters = require('../routes/productRoutes');
const categoryRouters = require('../routes/categoryRoutes');
const inventoryRouters = require('../routes/inventoryRoutes');
const orderRouters = require('../routes/orderRoutes');
const order_detailRouters = require('../routes/order_detailRoutes');

const app = express();
app.use(express.json());
app.use('/api/v1/users', userRouters);
app.use('/api/v1/products', productRouters);
app.use('/api/v1/categories', categoryRouters);
app.use('/api/v1/inventories', inventoryRouters);
app.use('/api/v1/orders', orderRouters);
app.use('/api/v1/order_details', order_detailRouters);

module.exports = app;



