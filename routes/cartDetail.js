const express = require('express')
const cart = require('../models/cart')
const router = express.Router()

const cartDetail = require('../models/cartDetail')

router.post('/insert', async (req, res) => {
    const { idsp, idcart, SoLuong } = req.body

    if (!idsp || !idcart || !SoLuong) return res.status(400).json({ successful: false, message: "Vui lòng nhập đầy đủ thông tin" })

    try {
        const newCartDetail = new cartDetail({
            idsp: idsp,
            idcart: idcart,
            SoLuong: SoLuong
        })

        await newCartDetail.save()

        res.json({ successful: true, message: "Thêm chi tiết giỏ hàng thành công", newCartDetail })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Lỗi server' })
    }
})

module.exports = router
