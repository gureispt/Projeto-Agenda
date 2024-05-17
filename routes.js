const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController')

function myMiddleware(req, res, next) {
    console.log();
    console.log('Passei no middleware');
    console.log();
    next();
}

//ROTAS HOME
route.get('/', homeController.homePag);
route.post('/', homeController.form);

//ROTAS DE CONTATO
route.get('/contato', contactController.homePag);

module.exports = route;