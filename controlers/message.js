'use strict'


var Message = require('../models/message');

/***********************************************************************
PUBLICAR UN MENSAJE
************************************************************************/
function postMessage(req, res) {

    var message = new Message()
    var params = req.body;

    if (params.message) {
        message.message = params.message;
        message.save((err, messagePost) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al publicar el mensaje'
                });
            } else {
                if (!messagePost) {
                    res.status(404).send({
                        message: 'No se ha podido publicar el mensaje'
                    });
                } else {
                    res.status(200).send({
                        message: messagePost
                    });
                }
            }
        });
    }
}

/***********************************************************************
LISTAR TODOS LOS MENSAJES
************************************************************************/
function getMessages(req, res) {

    Message.find().populate('user', 'fullName').exec((err, message) => {
        if (err) {

            res.status(500).send({
                message: 'Error al cargar mensajes'
            });
        } else {
            if (!message) {
                res.status(404).send({
                    message: 'No existen mensajes'
                });
            } else {
                console.log(message)
                res.status(200).send({
                    message
                });

            }
        }
    });
}

module.exports = {
    postMessage,
    getMessages

};