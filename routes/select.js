const Product = require('../models/Product')
const router = require('express').Router();
const detailOrder = require('../models/detailOrder')
const Order = require('../models/Order')
const verifyToken = require('../middleware/auth')



router.post("/top5sach", async (req, res) => {

    var listRes = [];
    var listResCTDDH = [];

    var listDDH = await Order.find({});
    var listCTDDH = await detailOrder.find({});
    var listProduct = await Product.find({});

    listProduct.forEach(element => {
        listRes.push(new ResTKe(element, 0));
    });

    listDDH.forEach(element => {
        var ngaydat = element.ngaydat;
        if ((ngaydat.getMonth() + 1) == req.body.Thang) {
            // console.log(element._id);
            listCTDDH.forEach(element1 => {
                if (JSON.stringify(element1.idorder) == JSON.stringify(element._id)) {
                    // console.log(element1.IdDDH + "_" + element1._id + "_" + element1.IdSP + "_" + element1.Soluong);
                    listResCTDDH.push(element1);
                }
            });
        }
    });

    listRes.forEach(element => {
        // console.log(element.product._id);
        listResCTDDH.forEach(element1 => {
            // console.log(element1.IdSP + "_" + element1.Soluong);
            if (JSON.stringify(element.product._id) == JSON.stringify(element1.idsp)) {
                // console.log(element.sum);
                element.sum = parseInt(element.sum) + parseInt(element1.SoLuong);
                // console.log(element.sum);

            }
        });
    });

    listRes = sortList('dec', listRes, 5);

    res.send(listRes);
})

function ResTKe(product, sum) {
    this.product = product;
    this.sum = sum;
};

function sortList(asc_or_dec, list, num) {
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

    list = list.slice(0, num);
    return list;
};



router.get("/4sachbanchay", async (req, res) => {
    var listRes = [];
    var listResCTDDH = [];

    var listDDH = await Order.find({});
    var listCTDDH = await detailOrder.find({});
    var listProduct = await Product.find({});

    listProduct.forEach(element => {
        listRes.push(new ResTKe(element, 0));
    });

    listDDH.forEach(element => {
        var ngaydat = element.ngaydat;
        // console.log(element._id);
        listCTDDH.forEach(element1 => {
            if (JSON.stringify(element1.idorder) == JSON.stringify(element._id)) {
                // console.log(element1.IdDDH + "_" + element1._id + "_" + element1.IdSP + "_" + element1.Soluong);
                listResCTDDH.push(element1);
            }
        });

    });

    listRes.forEach(element => {
        // console.log(element.product._id);
        listResCTDDH.forEach(element1 => {
            // console.log(element1.IdSP + "_" + element1.Soluong);
            if (JSON.stringify(element.product._id) == JSON.stringify(element1.idsp)) {
                // console.log(element.sum);
                element.sum = parseInt(element.sum) + parseInt(element1.SoLuong);
                // console.log(element.sum);

            }
        });
    });

    listRes = sortList('dec', listRes, 4);

    res.send(listRes);
})


router.get("/4sachmoinhat", async (req, res) => {
    var listProduct = await Product.find({});
    let listnew = []
    for (let i = listProduct.length - 1; i >= 0; i--) {
        listnew.push(listProduct[i])
    }
    listnew = listnew.slice(0, 4)
    res.json({
        listnew
    })
})

module.exports = router