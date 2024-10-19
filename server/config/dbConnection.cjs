// const { Pool } = require("pg");
// const { drizzle } = require("drizzle-orm/node-postgres");

// const connection = new Pool({
//   // host: process.env.DB_HOST,
//   // user: process.env.DB_USER,
//   // database: process.env.DB_NAME,
//   // password: process.env.DB_PASSWORD,
//   // port: process.env.DB_PORT,
//   connectionString: process.env.DB_URL,
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
// });

// const dbInstance = drizzle(connection);

// module.exports = { connection, dbInstance };
const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");

const isProduction = process.env.NODE_ENV === 'production';

const connection = new Pool({
  connectionString: process.env.DB_URL, 
  ssl: isProduction ? { rejectUnauthorized: false } : false 
});

const dbInstance = drizzle(connection);

module.exports = { connection, dbInstance };