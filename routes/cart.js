const express = require('express')
const router = express.Router()

const Cart = require('../models/cart')
const verifyToken = require('../middleware/auth')
const { route } = require('./product')

// create cart

router.post('/insert', async (req, res) => {
    const { TrangThai, IDUser } = req.body
    if (!TrangThai || !IDUser) return res.status(401).json({ successful: false, message: "Không được để trống" })

    try {
        const newCart = new Cart({
            TrangThai: TrangThai,
            user: IDUser,
        })

        await newCart.save()

        res.json({ successful: true, message: "Tao gio hang thanh cong", newCart })
    } catch (error) {
        res.status(500).json({ successful: false, message: `Loi server ${error}` })
    }
})

// DeleteCart

router.delete('/:id', async (req, res) => {
    try {
        const delCartCondition = { _id: req.params.id }
        let cartDelete = await Cart.findOneAndDelete(
            delCartCondition
        )
        if (!cartDelete) {
            return res.status(400).json({ successful: false, message: 'Không có giỏ hàng này nên không thể xóa' })
        }
        else return res.json({ successful: true, message: 'Xóa giỏ hàng thành công', cartDelete })
    } catch (error) {
        res.status(500).json({ successful: false, message: `Loi server ${error}` })

    }
})





module.exports = router