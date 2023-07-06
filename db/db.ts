import { Sequelize } from 'sequelize';

const db = new Sequelize(
  'orders_conserva',
  'postgres',
  'password',
  {
    host: 'db',
    port: 5432,
    dialect: 'postgres'
  }
);

const checkConnection = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {
  checkConnection,
  db,
}