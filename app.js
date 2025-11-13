const express = require('express');
//const userRouters = require('./src/routes/userRoutes');
//const productRouters = require('./src/routes/productRoutes');
//const categoryRouters = require('./src/routes/categoryRoutes');
//const inventoryRouters = require('./src/routes/inventoryRoutes');
//const orderRouters = require('./src/routes/orderRoutes');
//const orderdetailRouters = require('./src/routes/orderdetailRoutes');

const app = express();
app.use(express.json());
//app.use('/api/v1/users', userRouters);
//app.use('/api/v1/products', productRouters);
//app.use('/api/v1/categories', categoryRouters);
//app.use('/api/v1/inventories', inventoryRouters);
//app.use('/api/v1/orders', orderRouters);
//app.use('/api/v1/orderdetails', orderdetailRouters);

module.exports = app;



