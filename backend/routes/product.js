const express = require('express')
const { getProducts, createProduct, deleteProduct, updateProduct, getProduct } = require('../controllers/product')
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken')

const router = express.Router()


router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/',verifyToken, createProduct)
router.put('/:id', updateProduct)
router.delete('/:id',verifyTokenAndAuthorization, deleteProduct)


module.exports = router