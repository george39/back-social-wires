'use strict'

//modulos
var bcrypt = require('bcrypt-nodejs');

// modelos
var User = require('../models/user');

// servicio jwt
var jwt = require('../services/jwt');

/***********************************************************************
CREAR UN USUARIO
************************************************************************/
function saveUser(req, res) {

    // Crear objeto usuario
    var user = new User();
    var params = req.body;

    if (params.password && params.userName && params.fullName && params.email) {
        user.userName = params.userName;
        user.email = params.email;
        user.fullName = params.fullName;

        User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al comprobar usuario'
                });
            } else {
                if (!issetUser) {

                    bcrypt.hash(params.password, null, null, function(err, hash) {
                        user.password = hash;
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({
                                    message: 'Error al guardar usuario'
                                });
                            } else {

                                if (!userStored) {
                                    res.status(404).send({
                                        message: 'No se ha registrado el usuario'
                                    });
                                } else {

                                    res.status(200).send({
                                        user: userStored
                                    });
                                }
                            }

                        });
                    });
                } else {
                    res.status(400).send({
                        message: 'El usuario con ese email ya existe'
                    });
                }
            }
        });

    } else {
        res.status(400).send({
            message: 'Introduce los datos correctamente'
        });
    }
};



/***********************************************************************
LOGIN
************************************************************************/
function login(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error al comprobar usuario'
            });
        } else {
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        if (params.gettoken === 'null') {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {

                            res.status(200).send({
                                user,
                                token: jwt.createToken(user)
                            });
                        }

                    } else {
                        res.status(404).send({
                            message: 'El usuario no ha podido loguearse'
                        });
                    }
                });
            } else {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            }
        }
    });
}

/***********************************************************************
LISTAR TODOS LOS USUARIOS
************************************************************************/
function getUser(req, res) {
    User.find({ role: 'ADMIN_ROLE' }).exec((err, users) => {
        if (err) {

            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!users) {
                res.status(404).send({
                    message: 'El usuario no existe'
                });
            } else {
                res.status(200).send({
                    users
                });
            }
        }

    });
}

module.exports = {
    saveUser,
    login,
    getUser,
};