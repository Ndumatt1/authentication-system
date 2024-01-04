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
            const { hos_email, hos_name, password, hos_address, hos_telephone } = { 
            hos_email: payload.hos_email.trim(),
            hos_name: payload.hos_name.trim(),
            password: payload.password.trim(),
            hos_address: payload.hos_address.trim(),
            hos_telephone: payload.hos_telephone.trim()
            };
            const hosExists = await User.find({ hos_email: hos_email});
            if (hosExists.length > 0) {
                const response_data = {
                    "status": "fail",
                    "message": "Hospital already Exists"
                }
                return res.status(400).json(response_data);
            }
            const hosTelephoneExists = await User.find({ hos_telephone: hos_telephone });
            if (hosTelephoneExists.length > 0) {
                return res.status(400).json({ "message": "Telephone already in use!" })
            }
            const passwordHash = await PasswordManager.hash(password);
            await User.create({ password: passwordHash, hos_email, hos_name, hos_address, hos_telephone });
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
            const hosExists = await User.find({ email });
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
}
module.exports = Authentication;
