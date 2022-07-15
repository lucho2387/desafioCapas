const express = require('express')
const router = express.Router()
const { renderIndex, renderInfo, listProducts } = require('../controllers/index.controller')
const { isAuthenticated } = require('../middlewares/auth')

router.get('/', renderIndex)

router.get('/info', renderInfo)

router.get('/productos',isAuthenticated, listProducts)

module.exports = router