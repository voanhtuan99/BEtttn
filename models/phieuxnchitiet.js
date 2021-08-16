const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ctphieuxnSchema = new Schema({
    SoLuong: {
        type: Number,
        required: true
    },
    Gia: {
        type: Number,
        required: true
    },
    MaPhieu: {
        type: Schema.Types.ObjectId,
        ref: 'phieunhap'
    },
    MaSP: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
})

module.exports = mongoose.model('ctphieuxn', ctphieuxnSchema)