import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { app } from '../app.ts';
import productConstructor from '../models/product.js';
import orderConstructor from '../models/order.js';
import { db } from '../db/db.js';
import { DataTypes } from 'sequelize';
import { Instance } from '../types/models.js';

const Product = productConstructor(db, DataTypes);
const Order = orderConstructor(db, DataTypes);

describe('Orders', async () => {
  beforeEach(async () => {
    const products = [];
    for(let i = 0; i < 5; i++) {
      products.push({
        name: `Product ${i + 1}`,
        onStock: 50,
        price: Math.round(Math.random() * 100),
        createdAt: new Date,
        updatedAt: new Date,
      });
    }
    await Product.bulkCreate(products);
  });

  afterEach(async () => {
    await Product.destroy({ truncate: true });
  });

  describe('/', () => {
    beforeEach(async () => {
      const orders = [];
      const products = await Product.findAll();
      const product1: Instance = products[0];
      const product2: Instance = products[1];
      for(let i = 1; i < 3; i++) {
        orders.push({
          firstName: `Name ${i}`,
          lastName: `LastName ${i}`,
          address: `Address ${i}`,
          productId: ([product1, product2][Math.floor(Math.random() * 2)]).id,
          quantity: Math.floor(Math.random() * 3) + 1,
        });
      }
      Order.bulkCreate(orders);
    });
    test('list orders', async () => {
      const response = await request(app).get('/orders');
      const responseIds = response.body.map((order: Instance) => order.id);
      const expectedIds = (await Order.findAll()).map((order: Instance) => order.id);
      expect(responseIds).toBe(expectedIds);
    })
  });
})
