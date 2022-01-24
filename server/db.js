const { Client } = require('pg');
const connectionString = 'postgresql://postgres:******@localhost:5432/budge';

let _db;

function initDb(cb) {
    if (_db) {
        console.log("Trying to init DB again!!");
        return cb(null, _db);
    }

    new Client({ connectionString }).connect(connected);

    function connected(err, db) {
        if (err) {
            return cb(err)
        }
        console.log(`DB initialized! - connected to ${connectionString.split('@')[2]}`);
        _db = db;
        return cb(null, _db)
    }
}

function getDb() {
    return _db;
}


module.exports = {
    initDb,
    getDb
};
