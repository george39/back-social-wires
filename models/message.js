'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = Schema({
    message: { type: String, required: [true, 'El mensaje es obligatorio'] },
    date: {type: Date, default: Date.now()},
    user: { type: Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Message', MessageSchema);