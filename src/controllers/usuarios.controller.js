const usuariosCtrl = {}
const passport = require('passport')
const {  obtenerUsuario, verificarEmail, nuevoUsuario } = require('../services/usuarios.services')
const logger = require('../config/logger')

const Usuario = require('../models/Usuario')

usuariosCtrl.renderRegistroForm = (req, res) => {
    res.render('users/register')
}

usuariosCtrl.register = async (req, res) => {
    const errors = []
    const { nombre, email, password, confirmPassword } = req.body

    if(password !== confirmPassword){
        errors.push({text: 'Las contraseñas no coiciden'})
    }

    if(password.length < 4){
        errors.push({text: 'La contraseña debe contener mas de 4 caracteres'})
    }

    if(errors.length > 0){
        res.render('users/register', {
            errors,
            nombre,
            email,
            password,
            confirmPassword
        })
    }else {
        const emailUsuario = await verificarEmail(email)
        if(emailUsuario){
            req.flash('error', 'El correo ya existe')
            res.redirect('/usuario/registro')
        }else {
            await nuevoUsuario(nombre, email, password)
            req.flash('mensaje', 'El usuario fue registrado correctamente')
            res.redirect('/usuario/login')
        }   
    }
}

usuariosCtrl.renderLoginForm = (req, res) => {
    res.render('users/login')
}

usuariosCtrl.login = passport.authenticate('local', {
    failureRedirect: '/usuario/login',
    successRedirect: '/productos',
    failureFlash: true,
    
})

usuariosCtrl.salir = async (req, res) => {
    const user = req.user
    const usuario = await obtenerUsuario(user)
    req.logout()
    req.flash('mensaje', `Hasta Luego ${usuario.nombre}`)
    logger.info({ruta: req.url,metodo: req.method})
    res.redirect('/usuario/login')
}

module.exports = usuariosCtrl
