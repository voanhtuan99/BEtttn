const express = require('express')
const router = express.Router()

const PhieuXN = require('../models/PhieuXN')
const verifyToken = require('../middleware/auth')

router.post("/insert", async (req, res) => {
    const { maloai }
})