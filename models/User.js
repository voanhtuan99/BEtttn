const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    sdt: {
        type: String,
        required: true,
    },
    diachi: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'admin']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', UserSchema)