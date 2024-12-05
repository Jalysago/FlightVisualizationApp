//importing the Pool class from pg library
const { Pool } = require('pg');
require('dotenv').config();

//creating a pool instance
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  ssl: false,
});
console.log('connecting with: ', {});
// establishing a connection to the database.
pool
  .connect()
  .then(() => console.log('Connected to PostgresSQL'))
  .catch((err) => console.error('Connection error', err.stack));
//exporting the pool so it can be used in the server app.
module.exports = pool;
