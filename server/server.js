const express = require('express');
const bodyParser = require('body-parser');

const corsMiddleware = require('./middlewares/corsHelper');
const db = require('./db');

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


// server start
app.listen(port, async () => {
    console.log(`Server is up at port ${port}`);
    try {
        await db.connect();
        console.log('Successfully connected to DB');
        db.query('SELECT NOW()', (err, res) => {
            if (err) console.log('c err=', err);
            else console.log('c res=', res);
            db.end()
        })
    } catch (e) {
        console.log('Error connecting to the db. Reason=', e, JSON.stringify(e));
        console.log(' Exiting now...')
        process.exit();
    }
});

process.on('uncaughtException', () => {
    console.log('UncaughtException occurred! Exiting now...')
    process.exit();
})

module.exports = { app }