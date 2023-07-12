import { Sequelize, DataTypes } from 'sequelize';
import modelProduct from '../models/product.js';
import modelOrder from '../models/order.js';
import config from '../config/config.js';

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

const db = new Sequelize(
  config[process.env.NODE_ENV as string]['database'],
  config[process.env.NODE_ENV as string]['username'],
  config[process.env.NODE_ENV as string]['password'],
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