const Producto = require('../models/Producto')

async function getProduct(idProduct) {
    const producto = await Producto.findById(idProduct).lean()
    return producto
}

async function editProduct(idProduct, nombre, descripcion, codigo, imagen, precio, stock) {
    await Producto.findByIdAndUpdate(idProduct, { nombre, descripcion, codigo, imagen, precio, stock })
}

async function deleteProduct(idProduct) {
    await Producto.findByIdAndDelete(idProduct)
}

async function saveProduct(nombre, descripcion, codigo, imagen, precio, stock) {
    const nuevoProducto = new Producto ({nombre,descripcion,codigo,imagen,precio,stock})
    await nuevoProducto.save()
}

module.exports = { getProduct, editProduct, deleteProduct, saveProduct }