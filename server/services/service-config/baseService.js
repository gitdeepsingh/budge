class BaseService {
    constructor(db) {
        this.dbInstance = db;
    }

    // fetchFromDb(q) {
    //     const errorToThrow = {
    //         message: 'DB querying failed!!',
    //         statusCode: 500
    //     };
    //     return new Promise((resolve, reject) => {
    //         try {
    //             this.dbInstance.query(q, (err, res) => {
    //                 if (err) return reject({ ...errorToThrow })
    //                 else if (res?.rows?.length) resolve(res?.rows);
    //                 else return reject({ ...errorToThrow });
    //             });
    //         } catch (err) {
    //             console.log('fetchFromDb err: ', err);
    //             return reject({ errorToThrow })
    //         }

    //     })

    // }
}

module.exports = BaseService;