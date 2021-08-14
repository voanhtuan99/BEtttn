const mongoose = require('mongoose')
const Schema = mongoose.Schema

const detailOrderSchema = new Schema({
    SoLuong: {
        type: Number,
        require: true,
    },
    idorder: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    idsp: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }

})

module.exports = mongoose.model('detailOrder', detailOrderSchema)