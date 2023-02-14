'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = Schema({
    userName: { type: String, required: [true, 'El nombre de usuario es obligatorio'] },
    email: { type: String, unique: true, required: [true, 'El email es obligatorio'] },
    fullName: { type: String, required: [true, 'El nombre es obligatorio'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
});

module.exports = mongoose.model('User', UserSchema);