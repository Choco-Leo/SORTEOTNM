import dotenv from 'dotenv';
dotenv.config();

export const config = {
  // Servidor
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  
  // Base de datos
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET ,
  
  // Otros
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  SALT: process.env.SALT
};
