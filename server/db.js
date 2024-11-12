//importing the Pool class from pg library
const {Pool} = require('pg');

//creating a pool instance
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'flight_visualization',
    password: DB_PASSWORD,
    port: 3000,
});
// establishing a connection to the database.
pool.connect()
    .then(() => console.log('Connected to PostgresSQL'))
    .catch(err => console.error('Connection error', err.stack));
//exporting the pool so it can be used in the server app.
module.exports = pool;