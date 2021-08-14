const express = require('express')
const router = express.Router()

const Product = require('../models/Product')
const DetailOrder = require('../models/detailOrder')

const verifyToken = require('../middleware/auth')


// Select product

router.get('/all', async (req, res) => {
    console.log(Product)
    try {
        const products = await Product.find({});

        res.json({ successful: true, products })
    } catch (error) {
        res.json({ successful: false, message: 'Select false' })
    }
})

// Get 1 product

router.get('/:id', async (req, res) => {
    console.log('get product')
    try {
        const id = req.params.id
        const productget = await Product.findOne({ _id: id })

        res.json({ successful: true, message: 'Lấy thông tin sản phẩm thành công', productget })
    } catch (error) {
        console.log("Lỗi: " + error)
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})

// Create new product

router.post('/insert', async (req, res) => {
    console.log("insert")
    const { TenSP, SoLuong, DonGia, KhuyenMai, TacGia, Mota, img, loaisp } = req.body

    if (!TenSP || !SoLuong || !DonGia || !img) return res.status(400).json({ successful: false, message: `Nhập tiêu đề${req.body.KhuyenMai}` })




    try {
        const newProduct = new Product({
            TenSP: TenSP,
            SoLuong: SoLuong,
            DonGia: DonGia,
            KhuyenMai: KhuyenMai,
            Mota: Mota,
            img: img,
            loaisp: loaisp,
            TacGia: TacGia
        })

        await newProduct.save()

        res.json({ successful: true, message: `POST thanh cong${req.body.img}${req.body.Mota}`, newProduct })
    } catch (error) {
        console.log("Lỗi: " + error)
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})


router.put('/:id', async (req, res) => {
    const { TenSP, SoLuong, DonGia, KhuyenMai, Mota, img, loaisp, TacGia } = req.body

    if (!TenSP || !SoLuong || !DonGia) return res.status(400).json({ successful: false, message: `Nhập tiêu đề${req.body.KhuyenMai}` })

    console.log(req.body)

    try {
        var updateProduct = ({
            TenSP: TenSP,
            SoLuong: SoLuong,
            DonGia: DonGia,
            KhuyenMai: KhuyenMai,
            Mota: Mota,
            img: img,
            loaisp: loaisp,
            TacGia: TacGia
        })

        const productUpdateCondition = { _id: req.params.id }

        updateProduct = await Product.findOneAndUpdate(
            productUpdateCondition,
            updateProduct,
            {
                new: true
            }
        )
        if (!updateProduct) {
            return res.status(401).json({
                successful: false,
                message: 'ID sản phẩm không tồn tại'
            })
        }
        else return res.json({
            successful: true,
            message: 'Cập nhật sản phẩm thành công',
            updateProduct
        })
    } catch (error) {
        console.log("Lỗi: " + error)
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }
})


// DELETE product

router.delete('/:id', async (req, res) => {

    let ctddhs = await DetailOrder.findOne({ idsp: req.params.id })
    if (ctddhs) return res.status(400).json({ successful: false, message: 'Không thể xóa sản phẩm này', ctddhs })

    try {
        const productDeleteCondition = { _id: req.params.id }
        var deleteProduct = await Product.findOneAndDelete(
            productDeleteCondition
        )

        if (!deleteProduct) {
            return res.status(401).json({
                successful: false,
                message: 'ID sản phẩm không tồn tại'
            })
        }
        else return res.json({
            successful: true,
            message: 'Xóa sản phẩm thành công',
            deleteProduct
        })
    } catch (error) {

    }

})

module.exports = router