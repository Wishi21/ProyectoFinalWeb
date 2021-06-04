const express = require('express');

const routes = express.Router();

const {listar, obtenerCategorias, crear, editar, eliminar} = require('../controllers/categoriasController');

routes.get('/categorias', listar);

routes.get('/categorias/:id', obtenerCategorias)

routes.post('/categorias', crear )

routes.put('/categorias/:id', editar)

routes.delete('/categorias/:id', eliminar)

module.exports = routes;