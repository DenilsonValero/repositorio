// server.js
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const fs = require('fs');
const { Server } = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { jwtStrategy } = require('./passport');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Configuración de Handlebars
const hbs = exphbs.create({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'main',
    extname: '.handlebars'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
passport.use(jwtStrategy);
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const viewsRouter = require('./routes/views');
const sessionsRouter = require('./routes/sessions');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('newProduct', (product) => {
        io.emit('updateProducts', product);
    });

    socket.on('deleteProduct', (productId) => {
        io.emit('removeProduct', productId);
    });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
