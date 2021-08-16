const express = require('express')
const router = express.Router()

const CongTy = require('../models/CongTy')

const verifyToken = require('../middleware/auth')

router.post("/insert", verifyToken, async (req, res) => {
    const { TenCongTy, DiaChi, sdt } = req.body

    if (!TenCongTy || !DiaChi || !sdt) return res.status(400).json({ successful: false, message: "Không được để trống" })

    try {
        const congty = await CongTy.findOne({ TenCongTy })
        if (congty) return res.status(401).json({ successful: false, message: "Tên công ty đã bị trùng" })
        const newcongty = new CongTy({
            TenCongTy: TenCongTy,
            DiaChi: DiaChi,
            sdt: sdt
        })
        await newcongty.save()
        res.json({ successful: true, message: "Thêm 1 công ty thành công", newcongty })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})

router.get("/", verifyToken, async (req, res) => {
    try {
        const listCongty = await CongTy.find({})
        res.json({ successful: true, message: "Lấy danh sách công ty thành công", listCongty })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})



module.exports = router