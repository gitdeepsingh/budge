const BaseRouter = require("./baseRouter");
const {
  UserLoginService,
  UserRegisterService,
  UserProfileService,
  CreateExpenseService,
} = require("./../../services");

class BudgeRouter extends BaseRouter {
  constructor(db) {
    super();
    this.db = db;
  }

  initializeRoutes() {
    this.postHandlers.push({
      path: "/login",
      handler: this.userLogin.bind(this),
    });
    this.postHandlers.push({
      path: "/registration",
      handler: this.userRegister.bind(this),
    });
    this.getHandlers.push({
      path: "/profile/:userId",
      handler: this.userProfile.bind(this),
    });
    this.postHandlers.push({
      path: "/create-expense",
      handler: this.createExpense.bind(this),
    });
  }

  userLogin(req, res) {
    const _service = new UserLoginService(req, this.db);
    _service
      .login()
      .then((data) => {
        if (data) res.json({ status: "OK" });
      })
      .catch((error) => {
        console.log("userLogin error: ", error);
        res.status(error?.statusCode || 500).send({ error });
      });
  }

  userRegister(req, res) {
    const _service = new UserRegisterService(req, this.db);
    _service
      .register()
      .then((data) => {
        if (data) res.json({ status: "OK" });
      })
      .catch((error) => {
        console.log("userRegister error:", error);
        res.status(error?.statusCode || 500).send({ error });
      });
  }

  userProfile(req, res) {
    const userId = req?.params?.userId || "";
    const _service = new UserProfileService(req, this.db);
    _service
      .getProfile(userId)
      .then((data) => {
        console.log("userProfile data: >>>>", data);
        if (data) res.json(data);
      })
      .catch((error) => {
        console.log("userProfile error:", error);
        res.status(error?.statusCode || 500).send({ error });
      });
  }

  createExpense(req, res) {
    console.log("req:>>>>>body>> ", req?.body);
    const userId = req?.params?.userId || "";
    console.log("userId: ", userId);
    const _service = new CreateExpenseService(req, this.db);
    _service
      .create(userId)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log("createExpense error:", error);
        res.status(error?.statusCode || 500).send({ error });
      });
  }
}

module.exports = BudgeRouter;
