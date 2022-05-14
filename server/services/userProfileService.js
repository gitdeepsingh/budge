const BaseService = require("./service-config/baseService");

class UserProfileService extends BaseService {
    constructor(req, db) {
        super(req);
        this.db = db;
        this.body = req?.body || {};
        this.headers = req?.headers || {};
    }

    getProfile(userId) {
        const query = {
            text: 'SELECT * FROM users WHERE email= $1',
            values: [userId],
        }
        const errorToThrow = {
            message: 'service_not_reachable',
            statusCode: 500
        }

        return new Promise((resolve, reject) => {
            this.db.query(query, (dbErr, dbRes) => {
                if (dbErr) {
                    errorToThrow.message = 'DB querying failed!!';
                    return reject({ ...errorToThrow })
                } else if (dbRes?.rows?.length) {
                    if(dbRes.rows[0].hasOwnProperty('passcode')) delete dbRes.rows[0].passcode;
                    resolve(dbRes.rows[0]);
                } else return reject({ ...errorToThrow });
            });
        })

    }
}

module.exports = UserProfileService;
