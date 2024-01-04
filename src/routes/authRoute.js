const express = require('express');
const Authentication = require('../controller/auth');

/**
 * Handles routing for login and signup
 */


class AuthenticationRoute {
    router = express.Router();
    authentication = new Authentication();
    path = "/auth";

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(
            `${this.path}/signup`,
            this.authentication.userSignUp.bind(this.authentication)
        );
        this.router.post(
            `${this.path}/login`,
            this.authentication.login.bind(this.authentication)
        );
    }
}

module.exports = AuthenticationRoute;
