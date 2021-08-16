const express = require('express')
const router = express.Router()

const PhieuNhap = require('../models/PhieuXuatNhap')

const verifyToken = require('../middleware/auth')

router.post("/insert", verifyToken, async (req, res) => {
    const { NgayNhap, CongTy, LoaiPhieu } = req.body

    if (!CongTy) res.status(400).json({ successful: false, message: "Điền thiếu thông tin" })

    try {
        const phieunhapnew = new PhieuNhap({
            NgayNhap: NgayNhap || Date.now(),
            CongTy: CongTy,
            LoaiPhieu: LoaiPhieu
        })

        await phieunhapnew.save()

        res.json({ successful: true, message: "Tạo phiếu thành công", phieunhapnew })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })

    }
})

router.get("/listphieu", verifyToken, async (req, res) => {
    const { LoaiPhieu } = req.body
    if (!LoaiPhieu) return res.status(400).json({ successful: false, message: "Điền đủ thông tin" })
    try {
        const listphieunhap = await PhieuNhap.find({ LoaiPhieu })
        if (!listphieunhap) return res.status(401).json({ successful: false, message: "Không có loại phiếu này" })
        res.json({ successful: true, message: "Lấy ds phiếu thành công", listphieunhap })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })

    }
})

router.get("/", verifyToken, async (req, res) => {

    try {
        const listphieu = await PhieuNhap.find()
        res.json({ successful: true, message: "Lấy ds phiếu thành công", listphieu })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })

    }
})

module.exports = router