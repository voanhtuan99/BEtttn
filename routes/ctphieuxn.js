const express = require('express')
const router = express.Router()

const CTPhieu = require('../models/phieuxnchitiet')

const verifyToken = require('../middleware/auth')

router.post("/insert", verifyToken, async (req, res) => {
    const { SoLuong, Gia, MaPhieu, MaSP } = req.body

    if (!SoLuong || !Gia || !MaPhieu || !MaSP) return res.stale.status(401).json({ successful: false, message: "Vui lòng điền đủ thông tin" })

    try {
        const newCTPhieu = new CTPhieu({
            SoLuong,
            Gia,
            MaPhieu,
            MaSP
        })

        await newCTPhieu.save()

        res.json({ successful: true, message: "Tạo chi tiết phiếu thành công", newCTPhieu })

    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })

    }
})


router.post("/themctpx", verifyToken, async (req, res) => {
    const { SoLuong, Gia, MaPhieu, MaSP } = req.body

    if (!SoLuong || !Gia || !MaPhieu || !MaSP) return res.stale.status(401).json({ successful: false, message: "Vui lòng điền đủ thông tin" })

    try {
        const newCTPhieu = new CTPhieu({
            SoLuong,
            Gia,
            MaPhieu,
            MaSP
        })

        await newCTPhieu.save()

        res.json({ successful: true, message: "Tạo chi tiết phiếu thành công", newCTPhieu })

    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })

    }
})

router.get("/:id", verifyToken, async (req, res) => {
    try {
        let listCTPhieu = await CTPhieu.find({ MaPhieu: req.params.id })
        if (!listCTPhieu) return res.status(402).json({ successful: false, message: "Mã phiếu không tồn tại" })
        else res.json({ successful: true, message: "Lấy list ctphieu thành công", listCTPhieu })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})

module.exports = router
