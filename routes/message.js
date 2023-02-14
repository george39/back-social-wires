'use strict'

var express = require('express');
var MessageControler = require('../controlers/message');


var api = express.Router();
var mdAuth = require('../middlewares/autenticated');

api.post('/post-message',mdAuth.ensureAuth, MessageControler.postMessage);
api.get('/get-message', MessageControler.getMessages);


module.exports = api;