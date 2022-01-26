const BaseService = require("./service-config/baseService");
const bcrypt = require('bcryptjs');

class UserRegisterService extends BaseService {
    constructor(req, db) {
        super(req);
        this.db = db;
        this.body = req?.body || {};
        this.headers = req?.headers || {};
    }
    register() {
        return new Promise((resolve, reject) => {
            const { firstName, lastName, email, passphrase } = this.body;
            const userInfo = { firstName, lastName, email, passphrase };
            const errorToThrow = {
                message: 'service_not_reachable',
                statusCode: 500
            }

            // encrypt passphrase
            return bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(passphrase, salt, function (err, hash) {
                    userInfo.passphrase = hash;
                    const text = 'INSERT INTO users(firstname, lastname, email, passcode) VALUES($1, $2, $3, $4) RETURNING *'
                    const values = [...Object.values(userInfo)];
                    db.query(text, values, (dbErr, dbRes) => {
                        if (dbErr) {
                            if (dbErr.code === '23505' && dbErr.constraint === 'firstkey') {
                                errorToThrow.message = 'invalid email';
                                errorToThrow.code = 'firstkey';
                                errorToThrow.statusCode = 400;
                                console.log('Error while querying at registration. Reason="User email already exists!"');
                                return reject({ error: errorToThrow });
                            } else {
                                errorToThrow.message = 'DB querying failed!!';
                                console.log('Error while querying at registration. Reason=', dbErr);
                                return reject({ error: errorToThrow });
                            }
                        }
                        else {
                            resolve(true);
                        }
                    });
                });
            });
        });
    }
}

module.exports = UserRegisterService;
