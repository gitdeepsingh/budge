const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const corsMiddleware = require('./middlewares/corsHelper');
const DB = require('./db');



class BudgeApp {
    constructor() {

        this.app = express();
        this.port = process.env.PORT || 3001;
    }
    // middlewares 


    configureSecurity() {
        this.app.use(corsMiddleware);
        this.app.use(bodyParser.json());
        passport.use(new LocalStrategy(
            function (username, password, done) {
                User.findOne({ username: username }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
            }
        ));
    }

    startRouter() {
        const db = DB.getDb();
        // routes
        this.app.post('/registration', async (req, res) => {
            const { firstName, lastName, email, passphrase } = req.body;
            const userInfo = { firstName, lastName, email, passphrase };


            // encrypt passphrase
            await bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(passphrase, salt, function (err, hash) {
                    console.log("🚀 ~ file: server.js ~ line 26 ~ hash", hash)
                    userInfo.passphrase = hash;
                    console.log('userInfo: ', userInfo);
                    const text = 'INSERT INTO users(firstname, lastname, email, passcode) VALUES($1, $2, $3, $4) RETURNING *'
                    const values = [...Object.values(userInfo)];
                    db.query(text, values, (dbErr, dbRes) => {
                        if (dbErr) {
                            if (dbErr.code === '23505' && dbErr.constraint === 'firstkey') {
                                const errorToThrow = {
                                    message: 'invalid email',
                                    code: 'firstkey'
                                }
                                console.log('Error while querying at registration. Reason="User email already exists!"');
                                res.status(400).send({ error: errorToThrow });
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
            });
        });
        this.app.post('/login', (req, res) => {
            // test: deeptest4@test.com, 444444
            const { email, passphrase } = req?.body;
            const query = {
                text: 'SELECT * FROM users WHERE email= $1',
                values: [email],
            }
            const errorToThrow = {
                message: 'invalid credentials',
                status: 401
            }

            db.query(query, (dbErr, dbRes) => {
                if (dbErr) {
                    res.status(500).send({ error: { message: 'DB querying failed!!' } })
                } else if (dbRes?.rows?.length) {
                    const pw = dbRes?.rows[0].passcode;
                    if (pw) {
                        bcrypt.compare(passphrase, pw).then((isMatch) => {
                            if (isMatch) res.json(true)
                            else {
                                res.status(401).send({ error: errorToThrow });
                            }
                        });
                    }
                } else {
                    res.status(401).send({ error: errorToThrow });
                }
            });
        })
    }

    startServer() {
        this.app.listen(this.port, async (err) => {
            if (err) throw err;
            console.log(`Server is up at port ${this.port}`);
            try {
                this.configureSecurity();

                // setting up routes
                this.startRouter();
            } catch (e) {
                console.log('Error setting-up the routes. Reason=', e, JSON.stringify(e));
                console.log(' Exiting now...');
                db.end();
                process.exit();
            }
        });
    }

    startApp() {
        DB.initDb((dbErr) => {
            if (dbErr) throw dbErr;
            // server start
            this.startServer();
        })
    }

    stopApp() {
        setTimeout(() => {
            console.log('Stopping server....');
            process.exit();
        }, 10 * 1000)
    }
}

const budgeApp = new BudgeApp();

process.on('uncaughtException', (excp) => {
    console.log(`UncaughtException occurred! Exception="${excp} || ${JSON.stringify(excp)}" Exiting now...`)
    budgeApp.stopApp
})

budgeApp.startApp();
module.exports = budgeApp.app;