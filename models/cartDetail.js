const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartDetailSchema = new Schema({
    SoLuong: {
        type: Number,
        require: true
    },
    idsp: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    idcart: {
        type: Schema.Types.ObjectId,
        ref: 'cart'
    }
})

module.exports = mongoose.model('cartdetail', cartDetailSchema)