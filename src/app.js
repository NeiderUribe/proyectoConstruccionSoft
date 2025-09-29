const express = require('express');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const app = express();

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);

module.exports = app;