const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token)
        return res.status(400).json({ successful: false, message: 'Không tìm thấy token truy cập' })


    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log('Lỗi')
        return res.status(403).json({ successful: false, message: 'Token không có hiệu lực' })
    }
}

module.exports = verifyToken