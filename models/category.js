const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    TenLoai: {
        type: String,
        unique: true,
        required: true
    }
})
module.exports = mongoose.model('category', categorySchema)