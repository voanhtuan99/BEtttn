const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/auth')
const Products = require('../models/Product')
const cate = require('../models/category')

router.post('/insert', verifyToken, async (req, res) => {
    const { TenLoai } = req.body

    if (!TenLoai) return res.status(400).json({ successful: false, message: 'Loại không được để trống' })

    try {
        const category = await cate.findOne({ TenLoai })

        if (category) return res.status(400).json({ successful: false, message: 'Tên loại đã bị trùng' })

        const newCate = new cate({ TenLoai: TenLoai })

        await newCate.save()

        res.json({ successful: true, message: 'Thêm loại thành công', newCate })
    } catch (error) {
        console.log('Lỗi: ' + error)
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})



//select type

router.get('/all', async (req, res) => {
    try {
        const categories = await cate.find({})

        res.json({ successful: true, message: "Lấy danh sách loại thành công", categories })
    } catch (error) {
        console.log('Lỗi: ' + error)
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const categories = await cate.findOne({ _id: req.params.id })

        res.json({ successful: true, message: "Lấy danh sách loại thành công", categories })
    } catch (error) {
        console.log('Lỗi: ' + error)
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    const listproduct = await Products.findOne({
        loaisp: req.params.id
    })

    if (listproduct) return res.status(402).json({ successful: false, message: 'Có sản phẩm nên không thể xóa' })

    try {
        const cateDeleteCondition = { _id: req.params.id }
        let cateDelete = await cate.findOneAndDelete(cateDeleteCondition)

        if (!cateDelete) {
            return res.status(401).json({ successful: false, message: "Xoá sản phẩm thất bại" })
        }
        else res.json({ successful: true, message: 'Xóa loại sản phẩm thành công' })

    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})


module.exports = router