const { registerUser, loginUser, logoutUser } = require('../controllers/auth')

const express = require('express')
const { validateUser } = require('./verifyToken')
const router = express.Router()



router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)


module.exports = router