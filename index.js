'use strict'

var mongoose = require('mongoose');
var app = require('./app');

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/social-wires', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
    }
});

// Escuchar peticiones
app.listen(3200, () => {
    console.log('Exress server puerto 3200: \x1b[32m%s\x1b[0m', 'online');
});