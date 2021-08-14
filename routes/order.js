const express = require('express')
const router = express.Router()

const Order = require('../models/Order')

const verifyToken = require('../middleware/auth')

router.post('/insert', async (req, res) => {
    const { TrangThai, user, diachinhanhang } = req.body

    if (!TrangThai || !user) return res.status(401).json({ successful: false, message: "Tạo đơn đặt hàng tất bại" })

    try {
        const newOrder = new Order({
            TrangThai: TrangThai,
            user: user,
            diachinhanhang: diachinhanhang
        })

        await newOrder.save()

        res.json({
            successful: true,
            message: "Tạo đơn đặt hàng thành công",
            newOrder
        })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Lỗi server' })
    }
})


//Update

router.put("/:id", async (req, res) => {
    const { TrangThai, user, diachinhanhang } = req.body
    console.log(`${req.params.id}    ${TrangThai}   ${user}`)
    if (!TrangThai) res.status(401).json({ successful: false, message: "Cập nhật đơn đặt hàng thất bại" })

    try {
        let updateOrder = ({
            TrangThai: TrangThai,
            user: user,
            diachinhanhang: diachinhanhang

        })

        const updateCondition = { _id: req.params.id }

        updateOrder = await Order.findOneAndUpdate(
            updateCondition,
            updateOrder,
            {
                new: true
            }
        )
        if (!updateOrder) res.status(401).json({ successful: false, message: 'Không tìm thấy đơn đặt hàng cần cập nhật' })
        else res.json({ successful: true, message: 'Cập nhật sản phẩm thành công', updateOrder })

    } catch (error) {
        res.status(500).json({ successful: false, message: 'Lỗi server' })
    }
})


router.get("/", verifyToken, async (req, res) => {
    console.log("listorder")
    try {
        const Orders = await Order.find({})
        res.json({ successful: true, message: "Lay list Order thanh cong", Orders })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Lỗi server' })
    }
})

module.exports = router