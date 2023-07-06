import { Sequelize, DataTypes } from 'sequelize';
import modelProduct from '../models/product.js';
import modelOrder from '../models/order.js';

const db = new Sequelize(
  'orders_conserva',
  'postgres',
  'password',
  {
    host: 'db',
    port: 5432,
    dialect: 'postgres'
  }
);
const Product = modelProduct(db, DataTypes);
const Order = modelOrder(db, DataTypes);

const checkConnection = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    Product.sync();
    Order.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {
  checkConnection,
  db,
}