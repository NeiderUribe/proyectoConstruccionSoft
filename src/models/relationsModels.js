const User = require('./User');
const Order = require('./Order');
const Product = require('./Product');
const OrderDetail = require('./OrderDetail');
const Inventory = require('./Inventory');
const Category = require('./Category');

// 1 usuario puede tener Muchos pedidos
User.hasMany(Order, { foreignKey: 'id_cliente' });
Order.belongsTo(User, { foreignKey: 'id_cliente' });

// 1 pedido puede tener Muchos detalles
Order.hasMany(OrderDetail, { foreignKey: 'id_order' });
OrderDetail.belongsTo(Order, { foreignKey: 'id_order' });

// 1 producto puede estar en Muchos detalles
Product.hasMany(OrderDetail, { foreignKey: 'id_product' });
OrderDetail.belongsTo(Product, { foreignKey: 'id_product' });

// 1 inventario pertenece a 1 categoría
Category.hasMany(Inventory, { foreignKey: 'categoryId' });
Inventory.belongsTo(Category, { foreignKey: 'categoryId' });

// 1 producto puede estar relacionado con 1 inventario 
Inventory.hasMany(Product, { foreignKey: 'id_inventario' });
Product.belongsTo(Inventory, { foreignKey: 'id_inventario' });


