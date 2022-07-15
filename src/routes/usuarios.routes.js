const express = require('express')
const router = express.Router()
const { 
    renderRegistroForm,
    register,
    renderLoginForm,
    login,
    salir
 } = require('../controllers/usuarios.controller')

router.get('/usuario/registro', renderRegistroForm)

router.post('/usuario/registro', register)

router.get('/usuario/login', renderLoginForm)

router.post('/usuario/login', login)

router.get('/usuario/salir', salir)

module.exports = router
