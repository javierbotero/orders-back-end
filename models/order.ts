import { Model, Sequelize, InferAttributes, InferCreationAttributes } from 'sequelize';

const order = (sequelize: Sequelize, DataTypes: any) => {
  class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare firstName: string;
    declare lastName: string;
    declare address: string;
    declare productId: number;
    declare quantity: number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Order.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};

export default order;
