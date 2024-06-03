const app = require('../app');
const request = require('supertest');

let id;
let token;

beforeAll(async () => {
    const credentials = {
        email: "juan@mail.com",
        password: "juan123",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token
});

test('Get /hotels debe traer todos los hoteles', async () => {
    const res = await request(app).get('/hotels');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /hotels debe crear un hotel', async () => {
    const newHotel = {
        name: "Mariscal",
        description: "precios bajos",
        price: 100,
        address: "San Juan de Lurigancho",
        lat: 38.25,
        lon: 60.21,
    }
    const res = await request(app)
        .post('/hotels')
        .send(newHotel)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newHotel.name);
    expect(res.body.id).toBeDefined();
});

test('PUT/ reviews/:id debe actualizar', async () => {
    const hotelUpdate = {
        name: 'Caceres'
    };
    const res = await request(app)
        .put(`/hotels/${id}`)
        .send(hotelUpdate)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(hotelUpdate.name);
});

test('GET /hotels/:id debe traer un hotel por id', async () => {
    const res = await request(app).get('/hotels/'+id);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
});

test('DELETE /hotels/:id debe eliminar un hotel', async () => {
    const res = await request(app)
        .delete('/hotels/'+id)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
