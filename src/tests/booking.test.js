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
    token = res.body.token;
});


test('GET /bookings debe traer todas las reservas', async () => {
    const res = await request(app)
        .get('/bookings')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /bookings debe crear una reservación', async () => {
    const newbooking = {
        checkIn: '2024-05-05',
        checkOut: "2024-05-09",
    };
    const res = await request(app)
        .post('/bookings')
        .send(newbooking)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.checkIn).toBe(newbooking.checkIn);
});

test('PUT/ bookings/:id debe actualizar', async () => {
    const bookingUpdate = {
        checkIn: '2024-05-06'
    };
    const res = await request(app)
        .put(`/bookings/${id}`)
        .send(bookingUpdate)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.checkIn).toBe(bookingUpdate.checkIn);
});

test('DELETE /bookings /:id debe eliminar una review', async () => {
    const res = await request(app)
        .delete(`/bookings/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});

