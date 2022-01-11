const express = require('express');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');

const connectionString = 'postgresql://postgres:Bang@707@localhost:5432/postgres'

const corsMiddleware = require('./middlewares/corsHelper');

const app = express();
const port = process.env.PORT || 3001;
// 5432 pg port
// middlewares 
app.use(corsMiddleware);
app.use(bodyParser.json());

// routes
app.post('/registration', (req, res) => {

    res.json(req.body);
});
const pool = new Pool({
    connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
    if (err) console.log('err=', err);
    else console.log('res=', res);
    pool.end();
});
const client = new Client({
    connectionString,
});


// server start
app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
    client.connect().then(() => {
        console.log('Successfully connected to DB');
        client.query('SELECT NOW()', (err, res) => {
            if (err) console.log('c err=', err);
            else console.log('c res=', res);
            client.end()
        })
    }).catch(e => {
        console.log('Error connecting to DB. Reason=', e, JSON.stringify(e));
    })
});

module.exports = { app }