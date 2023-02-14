'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_de_la_apliccion_social';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        userName: user.userName,
        email: user.email,
        fullName: user.fullName,
        iat: moment().unix(),
        exp: moment().add(60, 'days').unix

    };
    return jwt.encode(payload, secret);
};