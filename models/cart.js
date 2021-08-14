const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    TrangThai: {
        type: String,
        required: true,
        enum: ['Rỗng', 'Đã tạo đơn', 'Đang mua']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('cart', cartSchema)