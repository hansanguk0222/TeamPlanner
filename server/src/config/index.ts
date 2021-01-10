import { PoolOptions } from 'mysql2/promise';

interface Config {
  devDB: PoolOptions;
  DB: PoolOptions;
  jwtSecret: string;
  jwtRefreshSecret: string;
  clientHost: string;
  serverHost: string;
}

const config: Config = {
  clientHost: process.env.MODE === 'dev' ? (process.env.DEV_CLIENT_HOST as string) : (process.env.HOST as string),
  serverHost: process.env.MODE === 'dev' ? (process.env.DEV_SERVER_HOST as string) : (process.env.HOST as string),
  devDB: {
    host: process.env.DB_DEV_HOST,
    user: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASS,
    port: Number(process.env.DB_DEV_PORT),
    database: process.env.DB_DEV_NAME,
    connectionLimit: 20,
    dateStrings: ['DATE'],
    multipleStatements: true,
  },
  DB: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    connectionLimit: 20,
    dateStrings: ['DATE'],
    multipleStatements: true,
  },
  jwtSecret: process.env.JWT_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
};

export default config;
