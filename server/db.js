const { Pool, Client } = require('pg');
const connectionString = 'postgresql://postgres:Bang@707@localhost:5432/budge';

const pool = new Pool({
    connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
    if (err) console.log('Error while querying pool. Reason=', err);
    else { }
    pool.end();
});
const client = new Client({
    connectionString,
});

module.exports = client;
