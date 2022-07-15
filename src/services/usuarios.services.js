const { getUser, searchEmail, saveUser } = require('../daos/usuarios.dao')


async function obtenerUsuario(user) {
    return await getUser(user)
}

async function verificarEmail(email) {
    return await searchEmail(email)
}

async function nuevoUsuario(nombre, email, password) {
    return await saveUser(nombre, email, password)
}

module.exports = { obtenerUsuario, verificarEmail, nuevoUsuario }