import 'dotenv/config';

type Config = {
  [index: string]: { [index: string]: any };
};

const config: Config = {
  "development": {
    "username": process.env.DEV_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.DEV_DATABASE,
    "host": "db",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.TEST_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.TEST_DATABASE,
    "host": "db",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

export default config;
export {
  Config
}