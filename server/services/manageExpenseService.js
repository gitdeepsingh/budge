const BaseService = require("./service-config/baseService");

class CreateExpenseService extends BaseService {
  constructor(req, db) {
    super(req);
    this.db = db;
    this.body = req?.body || {};
    this.headers = req?.headers || {};
  }

  // INSERT INTO expenses(userId,expenseType,expenseAmount,expenseDesc)
  // VALUES ('deeptest7@test.com', 'travel', 25000, 'This is my first travel expense!!')

  // CREATE TABLE expenses(
  //     userId CHAR(100) NOT NULL,
  //     expenseType CHAR(50) NOT NULL,
  //     expenseAmount CHAR(50) NOT NULL,
  //     expenseDesc CHAR(500))

  getAllExpenses(userId) {
    console.log("this.body:>>>> ", this.body);
    const query = {
      text: "SELECT * FROM expenses WHERE userId=$1",
      values: [userId],
    };
    const errorToThrow = {
      message: "invalid credentials",
      statusCode: 401,
    };

    return new Promise((resolve, reject) => {
      this.db.query(query, (dbErr, dbRes) => {
        if (dbErr) {
          console.log("dbErr: ", dbErr);
          errorToThrow.message = "DB querying failed!!";
          errorToThrow.statusCode = 500;
          return reject({ ...errorToThrow });
        } else if (dbRes) {
          console.log("dbRes?.rows: ", dbRes?.rows);
          resolve({ data: dbRes?.rows });
        } else return reject({ ...errorToThrow });
      });
    });
  }
}

module.exports = CreateExpenseService;
