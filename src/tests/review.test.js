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


test('GET /reviews debe traer todas las reviews', async () => {
    const res = await request(app)
        .get('/reviews')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /reviews debe crear una review', async () => {
    const newReview = {
        rating: '4.7',
        comment: "los baños era pequeños",
        hotelId: 2
    };
    const res = await request(app)
        .post('/reviews')
        .send(newReview)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.rating).toBe(newReview.rating);
});

test('PUT/ reviews/:id debe actualizar', async () => {
    const reviewUpdate = {
        rating: '4.2'
    };
    const res = await request(app)
        .put(`/reviews/${id}`)
        .send(reviewUpdate)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(reviewUpdate.rating);
});

test('DELETE /reviews /:id debe eliminar una review', async () => {
    const res = await request(app)
        .delete(`/reviews/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});
