const express = require('express');

const routes = express.Router();

var categorias = require('../controllers/categoriasController');
routes.get('/categorias', categorias.listar);
routes.get('/categorias/:id', categorias.obtenerCategorias);
routes.post('/categorias', categorias.crear );
routes.put('/categorias/:id', categorias.editar);
routes.delete('/categorias/:id', categorias.eliminar);

var personal = require('../controllers/personalController');
routes.get('/personal', personal.listarPersonal);
routes.get('/personal/:id', personal.obtenerPersonal);
routes.post('/personal', personal.crearPersonal );
routes.put('/personal/:id', personal.editarPersonal);
routes.delete('/personal/:id', personal.eliminarPersonal);

var tickets = require('../controllers/ticketsController');
routes.get('/tickets', tickets.listarTickets);
routes.get('/tickets/:id', tickets.obtenerTicket);
routes.post('/tickets', tickets.crearTicket );
routes.put('/tickets/:id', tickets.editarTicket);
routes.delete('/tickets/:id', tickets.eliminarTicket);

module.exports = routes;