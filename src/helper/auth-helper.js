const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Helper functions
 * PasswordManager - Hashes and compares a user password for signup and login
 * 
 * JWTManager - Creates new JsonWebToken after a successful login to handle stateless sessions
 */

const secret = process.env.JWT_SECRET;

const PasswordManager = {
    hash: async (password) => {
        const saltRounds = 10;
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            return hash;
        } catch (err) {
            throw err;
        }
    },
    comparePassword: async (password, hash) => {
        try {
            const result = await bcrypt.compare(password, hash);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

const JWTManager = {
    genAccessToken: (data) => {
        const signedToken = jwt.sign(data, secret, { expiresIn: '24h' });
        return signedToken;
    },

    verifyToken: (token) => {
        const decodedToken = jwt.verify(token, secret);
        return decodedToken
    }
}

module.exports = { PasswordManager, JWTManager };
