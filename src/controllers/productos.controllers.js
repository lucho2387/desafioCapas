const logger = require('../config/logger')
// const Producto = require('../models/Producto')
// const Usuario = require('../models/Usuario')
const { obtenerProducto, actualizarProducto, eliminarProducto, guardarProducto } = require('../services/productos.services')
const productosCtrl = {}


productosCtrl.renderPorductoForm = (req, res) => {
    logger.info({ruta: req.url,metodo: req.method})
    res.render('products/new-product')
}

productosCtrl.createNewProduct = async (req, res) => {
try {
        const {nombre,descripcion,codigo,imagen,precio,stock} = req.body
      
        if(nombre && descripcion && codigo && precio && imagen && stock) {
            await guardarProducto(nombre,descripcion,codigo,imagen,precio,stock)
            req.flash('mensaje', 'El producto fue guardado correctamente')
            res.redirect('/productos') 
            logger.info({ruta: req.url,metodo: req.method})
        }else {
            logger.error("Faltaron Completar campos")
            res.status(500).json({error:"Los datos son requeridos"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

productosCtrl.renderEditForm = async (req, res) => {
    const producto = await obtenerProducto(req.params.id)
    res.render('products/edit-product', { producto })
    logger.info({ruta: req.url,metodo: req.method})
}

productosCtrl.updateProduct = async (req, res) => {
    const { nombre, descripcion, codigo, imagen, precio, stock } = req.body
    await actualizarProducto(req.params.id, nombre, descripcion, codigo, imagen, precio, stock)
    req.flash('mensaje', 'El producto fue actualizado correctamente')
    logger.info({ruta: req.url,metodo: req.method})
    res.redirect('/productos')
}

productosCtrl.deleteProduct = async (req, res) => {
    await eliminarProducto(req.params.id)
    req.flash('mensaje', 'El producto fue eliminado correctamente')
    logger.info({ruta: req.url,metodo: req.method})
    res.redirect('/productos')
}

module.exports = productosCtrl


