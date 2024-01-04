const { string } = require('joi');
const { default: mongoose } = require('mongoose');
const db = require('mongoose');

/**
 * Model definition file
 * Creates a new users schema in the database
 */

const userSchema = new mongoose.Schema({
    hos_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    hos_address: {
        type: String,
        required: true,
        unique: true
    },
    hos_email: {
        type: String,
        required: true,
        unique: true
    },
    hos_telephone: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        required: false,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
