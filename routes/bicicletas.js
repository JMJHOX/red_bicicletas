
var express = require('express');
var Router = express.Router();
var BicicletaController = require('../controllers/bicicleta');


Router.get('/',BicicletaController.bicicleta_list);
Router.get('/create', BicicletaController.bicicleta_create_get);
Router.post('/create', BicicletaController.bicicleta_create_post);

module.exports= Router;