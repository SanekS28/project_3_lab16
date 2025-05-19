const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'rental_db',
    password: '5422',
    port: 5432,
});

module.exports = pool;
