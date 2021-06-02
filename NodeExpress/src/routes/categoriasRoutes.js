const express = require('express');

const routes = express.Router();

const {listar, obtenerCategorias, crear, editar, eliminar} = require('../controllers/categoriasController');

routes.get('/', listar);

routes.get('/:id', obtenerCategorias)

routes.post('/', crear )

routes.put('/:id', editar)

routes.delete('/:id', eliminar)

module.exports = routes;