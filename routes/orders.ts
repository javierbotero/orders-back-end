import express, { Request, Response }  from 'express';
import { DataTypes } from 'sequelize';
import multer from 'multer';
import model from '../models/order.js';
import modelProduct from '../models/product.js';
import { db } from '../db/db.js';

const router = express.Router();
const Order = model(db, DataTypes);
const Product = modelProduct(db, DataTypes);
const upload = multer();

router.use(upload.array('name'))

router.get('/', async (req: Request, res: Response) => {
  const products = await Order.findAll();
  res.json(products);
});
router.post('/', async (req: Request, res: Response) => {
  const { firstName, lastName, address,
    productId, quantity } = req.body;
  console.log(typeof productId, productId);
  console.log(req.body);
  const productIdParsed = parseInt(productId, 10);
  const onStockParsed = parseInt(quantity, 10);
  const product = await Product.findByPk(productIdParsed);
  if (product) {
    product.onStock -= onStockParsed;
    if(product.onStock >= 0) {
      await product.save();
    } else {
      res.json('No stock available');
    }
  }
  const order = await Order.create({
    firstName,
    lastName,
    address,
    productId: productIdParsed,
    quantity: onStockParsed
  });
  res.json(order.toJSON());
});

export default router;
