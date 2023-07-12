import express, { Request, Response }  from 'express';
import { DataTypes, Attributes, Model } from 'sequelize';
import multer from 'multer';
import model from '../models/order.js';
import modelProduct from '../models/product.js';
import { db } from '../db/db.js';
import { middlewareOrders } from '../schemas/order.js';

const router = express.Router();
const Order = model(db, DataTypes);
const Product = modelProduct(db, DataTypes);
const upload = multer();

type Instance = Attributes<Model>;

router.use(upload.array('name'));
router.use(middlewareOrders);

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Order.findAll();
    res.json(products);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const order: Instance = await Order.findByPk(id);
    if (order) {
      res.json(order)
    } else {
      res.json('Order not found');
    };
  } catch (err) {
    res.json({ error: err });
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, address,
      productId, quantity } = req.body;
    const productIdParsed = parseInt(productId, 10);
    const onStockParsed = parseInt(quantity, 10);
    const product: Instance = await Product.findByPk(productIdParsed);
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
  } catch (err) {
    res.json({ error: err });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { firstName, lastName, address,
      quantity } = req.body;
    const onStockParsed = parseInt(quantity, 10);
    const instanceOrder: Instance = await Order.findByPk(id);
    const instanceProduct: Instance = await Product.findByPk(instanceOrder.productId);

    if (onStockParsed < 0) {
      res.json('Not allowed negative quantities');
    } else if (instanceOrder && instanceProduct) {
      if (instanceOrder.quantity > onStockParsed) {
        instanceProduct.onStock += (instanceOrder.quantity - onStockParsed)
      } else if (instanceOrder.quantity < onStockParsed) {
        instanceProduct.onStock -= (onStockParsed - instanceOrder.quantity)
      }
      instanceProduct.save();
    }
    const result = await instanceOrder.update({
      firstName,
      lastName,
      address,
      quantity: onStockParsed
    })
    res.json(result);
  } catch (err) {
    res.json({ error: err });
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const order: Instance = await Order.findByPk(id);
    if (order) { await order.destroy() } else { res.json({ error: 'Order does not exist' }) }
    res.json(`Order ${id} was deleted`);
  } catch (err) {
    res.json({ error: err });
  }
})

export default router;
