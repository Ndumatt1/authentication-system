const App = require('./app');
const AuthenticationRoute = require('./routes/authRoute');

/**
 * Main Entry point
 */

const server = new App()
server.initializeRoutes([
    new AuthenticationRoute()
])
server.listen()