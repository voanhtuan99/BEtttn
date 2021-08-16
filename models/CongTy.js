const mongoose = require('mongoose')
const Schema = mongoose.Schema

const congtySchema = new Schema({
    TenCongTy: {
        type: String,
        required: true
    },
    DiaChi: {
        type: String,
        required: true
    },
    sdt: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('congty', congtySchema)
