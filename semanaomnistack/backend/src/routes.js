const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.post('/session', SessionController.create);

/** LISTAR PROFILE **/
routes.get('/profile', ProfileController.index);

/** LISTAR ONGS **/
routes.get('/ong', OngController.index);

/** CRIAR ONG **/
routes.post('/ong', OngController.create);

/** LISTAR CASOS **/
routes.get('/incident', IncidentController.index);

/** CRIAR CASO **/
routes.post('/incident', IncidentController.create);

/** DELETAR CASO **/
routes.delete('/incident/:id', IncidentController.delete);

module.exports = routes;