const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { fa } = require("@faker-js/faker");
const connection = new Pool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const dbInstance = drizzle(connection);

module.exports = { connection, dbInstance };
