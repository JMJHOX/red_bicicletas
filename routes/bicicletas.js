
var express = require('express');
var Router = express.Router();
var BicicletaController = require('../controllers/bicicleta');


Router.get('/',BicicletaController.bicicleta_list);
Router.get('/:id/update',BicicletaController.bicicleta_update_get);
Router.get('/create', BicicletaController.bicicleta_create_get);
Router.post('/create', BicicletaController.bicicleta_create_post);
Router.post('/:id/delete',BicicletaController.bicicleta_delete_post);
Router.post('/:id/update',BicicletaController.bicicleta_update_post);
module.exports= Router;