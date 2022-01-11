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
    const { firstName, lastName, email, passphrase } = req.body;
    const text = 'INSERT INTO users(firstname, lastname, email, passcode) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [firstName, lastName, email, passphrase];
    db.query(text, values, (dbErr, dbRes) => {
        if (dbErr) {
            if (dbErr.code === '23505' && dbErr.constraint === 'firstkey') {
                console.log('Error while querying at registration. Reason="User email already exists!"');
                res.status(400).send({ error: 'Invalid email' });
            } else {
                console.log('Error while querying at registration. Reason=', dbErr);
                res.status(500).send({ error: 'DB querying failed!!' });
            }
        }
        else {
            res.send(true);
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