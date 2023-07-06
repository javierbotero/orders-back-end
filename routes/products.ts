import express, { Request, Response }  from 'express';
import { DataTypes } from 'sequelize';
import model from '../models/product.js';
import { db } from '../db/db.js';

const router = express.Router();
const Product = model(db, DataTypes);

router.get('/', async (req: Request, res: Response) => {
  const products = await Product.findAll({ relation: 'products'});
  res.json(products);
});

export default router;
