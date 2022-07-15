const logger = require('../config/logger')
const { obtenerDatos, obtenerUsuario, obetnerListaProductos } = require('../services/index.services')
const indexCtrl = {}


indexCtrl.renderIndex = (req, res) => {
    res.render('index')
}

indexCtrl.renderInfo = async (req, res) => {
    const datos = await obtenerDatos()
    logger.info({ruta: req.url,metodo: req.method})
    res.render('process/info',{ datos })
}

indexCtrl.listProducts = async (req, res) => {
    const user = req.user
    const usuario = await obtenerUsuario(user)
    const productos = await obetnerListaProductos()
    logger.info({ruta: req.url,metodo: req.method})
    res.render('products/list-products', {usuario, productos})
    
}

module.exports = indexCtrl