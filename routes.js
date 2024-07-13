const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');

//ROTAS HOME
route.get('/', homeController.homePag);

// ROTAS DE LOGIN
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/access', loginController.access);
route.get('/login/logout', loginController.logout);

route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/register', contatoController.register);

module.exports = route;