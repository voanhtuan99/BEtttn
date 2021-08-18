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


router.get('/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        const listDetail = await detailOrder.find({ idorder: id })
        if (!listDetail) return res.status(403).json({ successful: false, message: "Khong tim thay don dat hang" })
        else res.json({ successful: true, message: "Lay CTDDH thanh cong", listDetail })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Lỗi server' })
    }
})

router.post("/top5banchay", verifyToken, async (req, res) => {
    const { Thang } = req.body

    if (!Thang) return res.status(400).json({ successful: false, message: "Không được để trống" })
    var listRes = [];
    var listResCTDDH = [];


    var listDDH = await Order.find({});
    var listCTDDH = await detailOrder.find({});
    var listProduct = await Product.find({});

    listProduct.forEach(element => {
        listRes.push(new ResTKe(element, 0));
    });



    listDDH.forEach(order => {
        var ngaydat = order.ngaydat;
        if ((ngaydat.getMonth() + 1) == Thang) {
            listCTDDH.forEach(ctddh => {

                if (ctddh.idorder == order._id) {
                    console.log(ctddh.idorder);
                    // console.log(element1.IdDDH + "_" + element1._id + "_" + element1.IdSP + "_" + element1.Soluong);
                    listResCTDDH.push(ctddh);
                }
            });
        }
    });
    listRes.forEach(pro => {
        // console.log(element.product._id);
        listResCTDDH.forEach(ctddh => {
            // console.log(element1.IdSP + "_" + element1.Soluong);
            if (pro.product._id == ctddh.idsp) {
                // console.log(element.sum);

                pro.sum = pro.sum + ctddh.SoLuong;
                // console.log(element.sum);
            }
        });
    });

    listRes = sortList('dec', listRes);

    res.send(listCTDDH);
})

function ResTKe(product, sum) {
    this.product = product;
    this.sum = sum;
};

function sortList(asc_or_dec, list) {
    for (var i = 0; i < list.length - 1; i++) {
        // console.log(list[i].sum);
        for (var j = i + 1; j < list.length; j++) {
            if (list[i].sum > list[j].sum) {
                var temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }

    if (asc_or_dec == "dec") {
        list = list.reverse();
    }

    list = list.slice(0, 5);
    return list;
};

module.exports = router