'use strict'

var express = require('express');
var UserControler = require('../controlers/user');


var api = express.Router();
var mdAuth = require('../middlewares/autenticated');

api.post('/save-user', UserControler.saveUser);
api.post('/login', UserControler.login);
api.get('/get-user', UserControler.getUser);

module.exports = api;