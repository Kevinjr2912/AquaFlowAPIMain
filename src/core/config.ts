import dotenv from 'dotenv';

dotenv.config();

export const config =  {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  PORT_SERVER: process.env.PORT_SERVER,
  SALT: process.env.SALT,
  HTTP_ONLY: process.env.HTTP_ONLY,
  AVAILABLE_DOMAINS: process.env.AVAILABLE_DOMAINS
} = process.env;