import express, { Request, Response } from 'express';
import { checkConnection } from './db/db.js';
import ProductsRouter from './routes/products.js';
import OrdersRouter from './routes/orders.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

try {
  checkConnection();
} catch (err) {
  console.log('the error was: ----->', err);
}

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello world!');
})

app.use('/products', ProductsRouter);
app.use('/orders', OrdersRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export {}
