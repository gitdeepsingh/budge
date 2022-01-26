const BaseRouter = require('./baseRouter');
const { UserLoginService } = require('./../../services');

class BudgeRouter extends BaseRouter {
    constructor(db) {
        super();
        this.db = db;
    }

    initializeRoutes() {
        this.postHandlers.push({
            path: '/login',
            handler: this.userLogin.bind(this)
        })
    }

    userLogin(req, res) {
        const _service = new UserLoginService(req, this.db)
        _service.login().then(data => {
            res.json({ status: 'OK' });
        }).catch(error => {
            res.status(error?.error?.statusCode || 500).send({ error });
        })
    }
}

module.exports = BudgeRouter;
