const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/conn');

describe('ONG', () =>{

    beforeEach( async() => {
       
       // await connection.migrate.latest();
        await connection.migrate.rollback();
    });

    afterAll(async () =>
    {
        await connection.destroy();
    })
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ong')
            .set('Authorization', 'asd')
            .send({
                
            name: "Love4PetAAA",
            email: "contato@teste.com.br",
            whatsapp: "13981685254",
            city: "São Vicente",
            uf: "SP"

        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})