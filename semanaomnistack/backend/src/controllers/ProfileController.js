const conn = require('../database/conn');

module.exports = {

    async index(request, response){

        const ong_id = request.headers.authorization;
        const incident = await conn('incident')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(incident)
        }
    }