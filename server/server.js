const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const corsMiddleware = require('./middlewares/corsHelper');
const DB = require('./db');
const BudgeRouter = require('./routes/route-config/budgeRouter');

class BudgeApp {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
    }

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
        try {
            const _router = new BudgeRouter(db);
            this.app.use('/', [_router.router]);
        } catch (err) {
            console.log('startRouter err: >>>', err);
        }
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
                // db.end();
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
    console.log('excp: ', excp);
    console.log(`UncaughtException occurred! Exception="${excp} || ${JSON.stringify(excp)}" Exiting now...`)
    budgeApp.stopApp
})

budgeApp.startApp();
module.exports = budgeApp.app;