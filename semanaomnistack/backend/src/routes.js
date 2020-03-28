const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.post('/session', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);

/** LISTAR PROFILE **/
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),ProfileController.index);

/** LISTAR ONGS **/
routes.get('/ong', OngController.index);

/** CRIAR ONG **/
routes.post('/ong', celebrate({
   [Segments.BODY]: Joi.object().keys({
       name: Joi.string().required(),
       email: Joi.string().required().email(),
       whatsapp: Joi.string().required().min(10).max(11),
       city: Joi.string().required(),
       uf: Joi.string().required().length(2),
   }) 
}), OngController.create);

/** LISTAR CASOS **/
routes.get('/incident', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

/** CRIAR CASO **/
routes.post('/incident', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required().positive(),
    }),
    
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

}), IncidentController.create);

/** DELETAR CASO **/
routes.delete('/incident/:id', celebrate ({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentController.delete);

module.exports = routes;