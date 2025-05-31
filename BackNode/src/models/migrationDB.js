import pool from '../config/db.js';

const createTables = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS loginST;
      CREATE TABLE IF NOT EXISTS loginST (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userNick VARCHAR(100) UNIQUE NOT NULL,
        passWD TEXT NOT NULL
      );
      
      DROP TABLE IF EXISTS gruposST;
      CREATE TABLE IF NOT EXISTS gruposST (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        it_Part VARCHAR(100) NOT NULL,
        deport_Select VARCHAR(100) NOT NULL,
        grupo_Select VARCHAR(100) NOT NULL
      );
      `
    );

    console.log('✅ Migracion Exitosa');
  } catch (error) {
    console.error('❌ Error en Migracion:', error);
  }
};

createTables();