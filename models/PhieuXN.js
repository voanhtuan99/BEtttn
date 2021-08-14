const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhieuXNSchema = new Schema({
    ngaynhap: {
        type: Date,
        default: Date.now
    },
    maloai: {
        type: Schema.Types.ObjectId,
        ref: 'loaiphieu'
    },
    macongty: {
        type: Schema.Types.ObjectId,
        ref: 'congty'
    }
})

module.exports = mongoose.model('phieuxn', PhieuXNSchema)