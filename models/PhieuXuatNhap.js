const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pnSchema = new Schema({
    NgayNhap: {
        type: Date,
        default: Date.now
    },
    CongTy: {
        type: Schema.Types.ObjectId,
        ref: "congty"
    },
    LoaiPhieu: {
        type: "String",
        enum: ["Phiếu nhập", "Phiếu xuất"]
    }
})

module.exports = mongoose.model('phieunhap', pnSchema)