import express from 'express';
import { checkConnection } from './db/db.js';
import ProductsRouter from './routes/products.js';
const app = express();
const port = 3000;
try {
    checkConnection();
}
catch (err) {
    console.log('the error was: ----->', err);
}
app.get('/', (_req, res) => {
    res.send('Hello world!');
});
app.use('/products', ProductsRouter);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
