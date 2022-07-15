const { obtenerInfo, getUser, getProducts } = require('../daos/index.dao')

async function obtenerDatos() {
    return await obtenerInfo()
}

async function obtenerUsuario(user) {
    return await getUser(user)
}

async function obetnerListaProductos() {
    return await getProducts()
}

module.exports = { obtenerDatos, obtenerUsuario, obetnerListaProductos }