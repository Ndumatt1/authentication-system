/**
 * Database connection file
 * Establishes connetion to a mongodb database
 */
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.URL;
const client = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', () => console.error('MonogoDB connection error'))
db.once('open', () => console.log('Database Connection succesfull!'));

module.exports = db