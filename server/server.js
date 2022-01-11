const express = require('express');
const bodyParser = require('body-parser');

const corsMiddleware = require('./middlewares/corsHelper');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

// middlewares 
app.use(corsMiddleware);
app.use(bodyParser.json());

// routes
app.post('/registration', (req, res) => {
    db.query('SELECT NOW()', (dbErr, dbRes) => {
        if (dbErr) console.log('c err=', dbErr);
        else {
            console.log('c res=', dbRes.rows);
            res.json(dbRes.rows);
        }
    });
});



// server start
app.listen(port, async () => {
    console.log(`Server is up at port ${port}`);
    try {
        await db.connect();
        console.log('Successfully connected to DB');
    } catch (e) {
        console.log('Error connecting to the db. Reason=', e, JSON.stringify(e));
        console.log(' Exiting now...');
        db.end();
        process.exit();
    }
});

process.on('uncaughtException', (excp) => {
    console.log(`UncaughtException occurred! Exception="${excp} || ${JSON.stringify(excp)}" Exiting now...`)
    process.exit();
})

module.exports = { app }