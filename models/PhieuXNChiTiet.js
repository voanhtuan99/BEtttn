const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhieuXNChiTietSchema = new Schema({
    soluong: {
        type: Number,
        required: true
    },
    dongia: {
        type: Number,
        required: true
    },
    giaban: {
        type: Number,
        required: true
    },
    idsp: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
})

module.exports = mongoose.model('phieuxnchitiet', PhieuXNChiTietSchema)