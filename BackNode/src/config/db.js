import pkg from 'pg';
const { Pool } = pkg;
import { config } from './env.js';

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT
});

export const dbConnect = async () => {
  try {
    await pool.connect();
    console.log('Base de datos conectada exitosamente');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

export default pool;