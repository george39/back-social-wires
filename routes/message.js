'use strict'

var express = require('express');
var MessageControler = require('../controlers/message');


var api = express.Router();
var mdAuth = require('../middlewares/autenticated');

api.post('/post-message',mdAuth.ensureAuth, MessageControler.postMessage);
api.get('/get-message', MessageControler.getMessages);
api.get('/get-message-current-user',mdAuth.ensureAuth, MessageControler.getMessageCurrentUser);
api.put('/update-message/:id',mdAuth.ensureAuth, MessageControler.updateMessage);


module.exports = api;