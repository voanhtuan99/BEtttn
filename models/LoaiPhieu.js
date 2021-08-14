const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loaiphieuSchema = new Schema({
    tenloai: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('loaiphieu', loaiphieuSchema)