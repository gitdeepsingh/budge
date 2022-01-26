const express = require('express');

class BaseRouter {
    constructor() {
        this.router = express.Router();
        this.postHandlers = [];
        this.initializeRoutes();
        this.startRoutes();
    }

    initializeRoutes() { }

    startRoutes() {
        this.postHandlers?.length > 0 && this.postHandlers.forEach((val) => {
            this.router.post(val.path, [val.handler]);
        })
    }
}

module.exports = BaseRouter;