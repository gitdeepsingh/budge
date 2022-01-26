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
                    errorToThrow.message = 'DB querying failed!!';
                    errorToThrow.statusCode = 500;
                    return reject({ ...errorToThrow })
                } else if (dbRes?.rows?.length) {
                    const pw = dbRes?.rows[0].passcode;
                    if (pw) {
                        return bcrypt.compare(passphrase, pw)
                            .then((res) => {
                                if (res) resolve(res)
                                else reject({ ...errorToThrow });
                            });
                    }
                } else return reject({ ...errorToThrow });
            });
        })

    }
}

module.exports = UserLoginService;
