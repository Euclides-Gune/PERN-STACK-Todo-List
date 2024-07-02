const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '7755post',
    database: 'perntodo'
});

module.exports = pool;