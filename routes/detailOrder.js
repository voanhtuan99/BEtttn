const express = require('express')
const router = express.Router()

const detailOrder = require('../models/detailOrder')
const verifyToken = require('../middleware/auth')
// insert

router.post("/insert", async (req, res) => {
    const { SoLuong, idorder, idsp } = req.body

    if (!SoLuong || !idorder || !idsp) return res.status(401).json({ successful: false, message: 'Còn thiếu thông tin để tạo' })

    try {
        const newDetailOrder = new detailOrder({
            SoLuong: SoLuong,
            idorder: idorder,
            idsp: idsp
        })

        await newDetailOrder.save()

        res.json({ successful: true, message: "Thêm chi tiết ddh thành công", newDetailOrder })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Lỗi server' })
    }
})

module.exports = router