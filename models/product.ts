import { Model, Sequelize } from 'sequelize';

export default function buildProduct(sequelize: Sequelize, DataTypes: any) {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    onStock: DataTypes.NUMBER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
  });
  return Product;
};