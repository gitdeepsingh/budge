const { Client } = require('pg');
const connectionString = 'postgresql://postgres:******7@localhost:5432/budge';
const client = new Client({
    connectionString,
});

module.exports = client;
