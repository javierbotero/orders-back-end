'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = [];
    for(let i = 0; i < 10; i++) {
      products.push({
        name: `Product ${i + 1}`,
        onStock: 50 + i,
        price: 10 + i,
        createdAt: new Date,
        updatedAt: new Date,
      })
    }
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
