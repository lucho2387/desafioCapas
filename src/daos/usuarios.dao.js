const Usuario = require('../models/Usuario')


async function getUser(user) {
    const usuario = await Usuario.findById(user).lean()
    return usuario
}

async function searchEmail(email) {
    const correo = await Usuario.findOne({ email: email })
    return correo
}

async function saveUser(nombre, email, password) {
    nuevoUsuario = new Usuario({nombre, email, password})
    nuevoUsuario.password = await nuevoUsuario.encriptarContraseña(password)
    await nuevoUsuario.save()
}


module.exports = { getUser, searchEmail, saveUser }