import mysql from 'mysql2/promise';

const {
  MYSQL_HOST = 'localhost',
  MYSQL_PORT = '3306',
  MYSQL_USER = 'root',
  MYSQL_PASSWORD = 'Pramod@1309',
  MYSQL_DATABASE = 'invenia'
} = process.env;

export const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  multipleStatements: true
});

export async function initDb() {
  const conn = await pool.getConnection();
  try {
    await conn.query(`
      CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\`;
      USE \`${MYSQL_DATABASE}\`;
      CREATE TABLE IF NOT EXISTS subscribers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS contacts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS chat_logs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        role ENUM('user','assistant','system') NOT NULL,
        content TEXT NOT NULL,
        session_id VARCHAR(64) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } finally {
    conn.release();
  }
}

export async function withDb(fn) {
  const conn = await pool.getConnection();
  try {
    await conn.query(`USE \`${MYSQL_DATABASE}\``);
    return await fn(conn);
  } finally {
    conn.release();
  }
}
