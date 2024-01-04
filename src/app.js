const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
require('dotenv').config();

/**
 * Instantiates a new express app middlewares
 */

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? 8080;
        this.initializeMiddleWares();
    }

    initializeMiddleWares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/api', route.router)
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server Started successfully on http://localhost:${this.port}` );
        });
    }
}

module.exports = App
