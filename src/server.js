const express = require('express')
const cookieParser = require("cookie-parser")
const handlebars = require('express-handlebars')
const path =  require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require("connect-mongo")
const cluster = require('cluster');
const numCPUs = require('os').cpus().length
const compression = require('compression')
const logger = require('./config/logger')
const dotenv = require('dotenv')
dotenv.config();
require('./config/database')


const advancedOptions = {
    useNewUrlParser: true,
    useunifiedTopology: true
}

// const Producto = require('./models/Producto')
// const Usuario = require('./models/Usuario')
// const { isAuthenticated } = require('./middlewares/auth')
const { NAME, NAME_DATABASE, PASSWORD } = process.env

// // Inicializacion
const app = express()

const PORT = parseInt(process.argv[2])
const modoCluster = process.argv[3] == 'CLUSTER'


app.set('port', PORT || 8080)


if (modoCluster && cluster.isPrimary) {
 
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)
 
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
 
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
 } else {
    // Inicializacion
    require('./config/passport')

    app.set("views", path.join(__dirname, "views"));
    
    // Motor de Plantilla (Handlebars)
    app.engine(
        ".hbs",
        handlebars.engine({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        })
    );
    app.set("view engine", ".hbs");

    // Middlewares
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride('_method'))
    app.use(cookieParser())
    app.use(session({
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${NAME}:${PASSWORD}@cluster0.9xnml.mongodb.net/${NAME_DATABASE}?retryWrites=true&w=majority`,
            mongoOptions: advancedOptions,
            ttl: 60
        }),
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000
        }
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    // app.use(compression())


    // Variables Globales
    app.use((req, res, next) => {
    res.locals.mensaje = req.flash('mensaje')
    res.locals.error = req.flash('error')
    // res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next()
    })

    // Rutas
    app.use(require('./routes/index.routes'))
    app.use(require('./routes/productos.routes'))
    app.use(require('./routes/usuarios.routes'))

    // Archivos Estaticos
    app.use(express.static(path.join(__dirname, "public")));

 }

app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto:', app.get('port'))
})

 

