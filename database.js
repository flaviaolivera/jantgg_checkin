const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost', 
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'panaderia',
  connectionLimit: 5
});

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getConnection };
