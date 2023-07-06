import express from 'express';
import { DataTypes } from 'sequelize';
import model from '../models/product.js';
import { db } from '../db/db.js';
const router = express.Router();
const Product = model(db, DataTypes);
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});
export default router;
