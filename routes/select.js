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

function sortAll(asc_or_dec, list) {
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

    res.json({ listRes });
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

router.get("/sachgiamgia", async (req, res) => {
    var listProduct = await Product.find({});
    let listnew = []
    listProduct.forEach((product, index) => {
        if (parseInt(product.KhuyenMai) > 0) {
            listnew.push(product)
        }
    })
    res.json({ listnew })
})


router.get("/sachbanchay", async (req, res) => {
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

    listRes = sortAll('dec', listRes)

    let listnew = []
    listRes.forEach(elm => {
        listnew.push(elm.product)
    })
    res.json({ listRes });
})


router.post("/timsachtheoloai", async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).json({ successful: false, message: "Vui lòng điền đủ thông tin" })

    try {
        const productget = await Product.find({ loaisp: id })
        if (!productget) return res.status(403).json({ successful: false, message: "Không tìm thấy sách có thể loại này" })
        else res.json({ successful: true, message: `Lấy các sách có id thể loại ${id} thành công`, productget })
    } catch (error) {
        res.status(500).json({ successful: false, message: 'Server bị lỗi' })
    }

})


router.get("/timsachsieusale", async (req, res) => {
    let listProduct = await Product.find({})
    let listnew = []
    listProduct.forEach((product, index) => {
        if (parseInt(product.KhuyenMai) > 0) {
            listnew.push(product)
        }
    })

    listnew = sortDiscount(listnew, 4)
    res.json({ listnew })
})


function sortDiscount(list, num) {
    for (var i = 0; i < list.length - 1; i++) {
        // console.log(list[i].sum);
        for (var j = i + 1; j < list.length; j++) {
            if (list[i].KhuyenMai > list[j].KhuyenMai) {
                var temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
    list = list.reverse();

    list = list.slice(0, num);
    return list;
};

module.exports = router