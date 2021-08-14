const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    ngaydat: {
        type: Date,
        default: Date.now
    },
    TrangThai: {
        type: String,
        require: true
    },
    diachinhanhang: {
        type: String,
    },
    TongTien: {
        type: Number,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('order', orderSchema)

