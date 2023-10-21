const { default: mongoose } = require('mongoose');
const db = require('mongoose');

/**
 * Model definition file
 * Creates a new users schema in the database
 */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
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