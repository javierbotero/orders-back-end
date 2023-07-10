import Joi from 'joi';
import { Request, Response, NextFunction }  from 'express';

const name = Joi.string().
  alphanum().
  min(3).
  required();

const schemaProduct = Joi.object({
  firstName: name,
  lastName: name,
  address: Joi.string(),
  quantity: Joi.number(),
  productId: Joi.number(),
});

const middlewareOrders = (req: Request, res: Response, next: NextFunction) => {
  const checkMethod = ['post', 'put'].includes(req.method.toLowerCase());
  const checkPath = /^(\/)$|^(\/\d+)$/.test(req.path);
  console.log(`req.method: ${req.method}, req.path: ${req.path}, checkMethod: ${checkMethod}, checkPath: ${checkPath}, checkPath: ${checkPath}`);
  if (checkMethod && checkPath) {
    const { error, value } = schemaProduct.validate(req.body);
    console.log(error?.details);
    if (error) {
      res.status(402).json({ error: error.details.map(err => err.message).join(', ') });
    } else {
      next();
    }
  }
}

export default schemaProduct;
export { middlewareOrders };
