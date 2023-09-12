const express = require('express')
const { getCarts, createCart, deleteCart, updateCart, getCart } = require('../controllers/cart')
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken')

const router = express.Router()


router.get('/', getCarts)
router.get('/:id',verifyTokenAndAuthorization, getCart)
router.post('/',verifyToken, createCart)
router.put('/:id',verifyTokenAndAuthorization, updateCart)
router.delete('/:id',verifyTokenAndAuthorization, deleteCart)


module.exports = router