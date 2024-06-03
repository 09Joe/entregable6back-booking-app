const app = require('../app')
const request = require('supertest')

let token;
let id;

beforeAll(async () => {
    const credentials = {
        email: "juan@mail.com",
        password: "juan123"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET/ cities debe traer todas las ciudades', async () => {
    const res = await request(app).get('/cities');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ cities debe crear una ciudad', async () => {
    const newCity = {
        name: "city test",
        country: "country test",
        countryId: "CTEST",
    }
    const res = await request(app)
        .post('/cities')
        .send(newCity)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCity.name);
    expect(res.body.id).toBeDefined();
});

test('PUT/ reviews/:id debe actualizar', async () => {
    const cityUpdate = {
        name: 'city test17'
    };
    const res = await request(app)
        .put(`/cities/${id}`)
        .send(cityUpdate)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(cityUpdate.name);
});


//recuerda agregar la logica del id en POST y al inicio antes de hacer la del DELETE

test('DELETE / cities/:id debe borrar una ciudad', async () => {
    const res = await request(app)
        .delete(`/cities/${id}`)
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});