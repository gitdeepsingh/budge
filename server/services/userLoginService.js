const BaseService = require("./service-config/baseService");
const bcrypt = require('bcryptjs');

class UserLoginService extends BaseService {
    constructor(req, db) {
        super(req);
        this.db = db;
        this.body = req?.body || {};
        this.headers = req?.headers || {};
    }

    login() {
        const { email, passphrase } = this.body;
        const query = {
            text: 'SELECT * FROM users WHERE email= $1',
            values: [email],
        }
        const errorToThrow = {
            message: 'invalid credentials',
            statusCode: 401
        }

        return new Promise((resolve, reject) => {
            this.db.query(query, (dbErr, dbRes) => {
                if (dbErr) {
                    return reject({ error: {statusCode: 500, message: 'DB querying failed!!' } })
                } else if (dbRes?.rows?.length) {
                    const pw = dbRes?.rows[0].passcode;
                    if (pw) {
                        bcrypt.compare(passphrase, pw)
                        .then((res) => {
                            if (res) return resolve(res)
                            else {
                                return reject({ error: errorToThrow });
                            }
                        });
                    }
                } else {
                    return reject({ error: errorToThrow });
                }
            });
        })
         
    }
}

module.exports = UserLoginService;
