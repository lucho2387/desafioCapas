const Usuario = require('../models/Usuario')
const Producto = require('../models/Producto')

async function obtenerInfo() {
    const util = require('util');
    const directorio = process.cwd()
    const ruta = process.execPath
    const procesoId = process.pid
    const nombrePlataforma = process.platform
    const versionNode = process.version
    const argumentoEntrada = process.argv
    const memoriaReservada = util.inspect(process.memoryUsage().rss)
    const totalCPUs = require('os').cpus().length
    const datos = {
        directorio,
        ruta,
        procesoId,
        nombrePlataforma,
        versionNode,
        argumentoEntrada,
        memoriaReservada,
        totalCPUs
    }
    return datos
}

async function getUser(user) {
    const usuario = await Usuario.findById(user).lean()
    return usuario
}

async function getProducts() {
    const productos = await Producto.find().lean()
    return productos
}

module.exports = { obtenerInfo, getUser, getProducts }