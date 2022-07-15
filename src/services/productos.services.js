const {  getProduct, editProduct, deleteProduct, saveProduct } = require('../daos/productos.dao')

async function obtenerProducto(idProduct) {
    return await getProduct(idProduct)
}

async function actualizarProducto(idProduct, nombre, descripcion, codigo, imagen, precio, stock) {
    return await editProduct(idProduct, nombre, descripcion, codigo, imagen, precio, stock)
}

async function eliminarProducto(idProduct) {
    return await deleteProduct(idProduct)
}

async function guardarProducto(nombre, descripcion, codigo, imagen, precio, stock) {
    return await saveProduct(nombre, descripcion, codigo, imagen, precio, stock)
}



module.exports = { obtenerProducto, actualizarProducto, eliminarProducto, guardarProducto }