const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({

    TenSP: {
        type: String,
        required: true,
    },
    SoLuong: {
        type: Number,
        required: true
    },
    DonGia: {
        type: Number,
        required: true
    },
    KhuyenMai: {
        type: Number,
    },
    Mota: {
        type: String
    },
    img: {
        type: String
    },
    loaisp: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    TacGia: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('product', ProductSchema)