'use strict'


var Message = require('../models/message');

/***********************************************************************
PUBLICAR UN MENSAJE
************************************************************************/
function postMessage(req, res) {

    var message = new Message()
    var params = req.body;

    if (params.message) {
        message.title = params.title;
        message.message = params.message;
        message.user = req.user.sub;
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
    Message.find().populate('user', 'fullName userName').exec((err, messages) => {
        if (err) {
            res.status(500).send({
                message: 'Error al cargar mensajes'
            });
        } else {
            if (!messages) {
                res.status(404).send({
                    message: 'No existen mensajes'
                });
            } else {
                res.status(200).send({
                    messages
                });
            }
        }
    });
}

/************************************************************
 LISTAR MENSAJES DEL USUARIO ACTUAL
*************************************************************/
function getMessageCurrentUser(req, res) {
    Message.find(({user: req.user.sub}), (err, messageUser) => {
        if (err) {
            res.status(500).send({
                message: 'Error al cargar mensajes'
            });
        } else {
            if (!messageUser) {
                res.status(404).send({
                    message: 'No existen mensajes'
                });
            } else {
                res.status(200).send({
                    messageUser
                });
            }
        }
    });
}

/***********************************************************************
ACTUALIZAR UN MENSAJE
************************************************************************/
function updateMessage(req, res) {

    var messageId = req.params.id;
    var update = req.body;

    Message.findByIdAndUpdate(messageId, update, { new: true }, (err, messageUpdate) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el mensaje'
            });
        } else {
            if (!messageUpdate) {
                res.status(404).send({
                    message: 'El mensaje con ese id no existe'
                });
            } else {
                res.status(200).send({
                    message: messageUpdate
                });
            }
        }
    });
}

module.exports = {
    postMessage,
    getMessages,
    getMessageCurrentUser,
    updateMessage

};