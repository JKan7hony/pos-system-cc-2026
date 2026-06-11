const { Pool } = require('pg');

// Validar que existan todas las variables necesarias
if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_NAME ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD
) {
  throw new Error(
    'Faltan variables de entorno para la conexión a PostgreSQL'
  );
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // SSL para entornos cloud (Azure PostgreSQL, AWS RDS, etc.)
  ssl:
    process.env.DB_SSL === 'true'
      ? { rejectUnauthorized: false }
      : false,

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Manejo de errores del pool
pool.on('error', (err) => {
  console.error(
    'Error inesperado en el pool de conexiones:',
    err.message
  );
});

module.exports = pool;