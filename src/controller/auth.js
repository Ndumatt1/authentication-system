const { UserSignUpSchema, LoginSchema} = require('../helper/validate');
const db = require('../config/db');
const User = require('../model/user');
const { PasswordManager, JWTManager } = require('../helper/auth-helper');
require('dotenv').config();

class Authentication {
    constructor() {
    }
    async userSignUp (req, res) {
        try {
            const payload = req.body;
            const { error } = UserSignUpSchema.validate(payload);
            if (error) {
                return res.status(400).json({'error': error.details});
            }
            const { email, username, password } = { 
            email: payload.email.trim(),
            username: payload.username.trim(),
            password: payload.password.trim()
            };
            const userExists = await User.find({ email: email});
            if (userExists.length > 0) {
                const response_data = {
                    "status": "fail",
                    "message": "User already Exists"
                }
                return res.status(400).json(response_data);
            }
            const usernameExist = await User.find({ username: username });
            if (usernameExist.length > 0) {
                return res.status(400).json({ "message": "Username already in use!" })
            }
            const passwordHash = await PasswordManager.hash(password);
            await User.create({ password: passwordHash, email, username });
            const response_data = {
                "status": "success",
                "message": "Signup successful",
                "data": null
            }
            return res.status(201).json(response_data);
             } catch(err) {
                console.log(`An error occurred!: ${err}`);
                return res.status(500).json({"message": "Internal server Error"});
         }
    }
    
    async login(req, res) {
        try {
            const payload = req.body;
            const { error } = LoginSchema.validate(payload);
            if (error) {
                return res.status(400).json({ 'error': error.details });
            }
            const { email, password } = {
                email: payload.email.trim(),
                password: payload.password.trim()
            };
            const userExists = await User.find({ email });
            if (userExists.length == 0) {
                const response_data = {
                    "status": "fail",
                    "message": "Email doesnt exist"
                }
                 return res.status(404).json(response_data);
            }
            const passwordMatch = await PasswordManager.comparePassword(password, userExists[0].password);
            if (!passwordMatch) {
                const response_data = {
                "status": "fail",
                "message": "Incorrect password"
             }
                 return res.status(400).json(response_data);
             }
            const accessToken = JWTManager.genAccessToken({
                userId: userExists._id
            });
                const response_data = {
                "status": "success",
                "data": {
                    "token": accessToken,
                    "userId": userExists[0]._id,
                     "username": userExists[0].username
             }   
            }
            return res.status(200).json(response_data)
        } catch(err) {
            console.log(`An error occurred!: ${err}`);
            return res.status(500).json({ "message": "Internal Server Error" });
        }
    }

    async logout(req, res) {
        const token = req.header['Authorization'];
        // implement login
    }
}
module.exports = Authentication;