const app = require('../app');
const request = require('supertest');

let id;
let token;

//1 POST/users
//2 POST/users/login
//3 los demas tests


test('POST/ debe crear un nuevo usuarios', async () => {
    const newUser = {
        firstName:"test user",
        lastName: "test user",
        email: "test@mail.com",
        password: "1234567",
        gender: "other",
    }

    const res = await request(app).post('/users').send(newUser);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newUser.firstName);
});

test('POST/ users/login debe loggear el usuario ' , async () => {
    const credentials = {
        email: 'test@mail.com',
        password: '1234567',
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(credentials.email);
});

test('POST/ users/login con credenciales incorrectas debe dar un error' , async () => {
    const credentials = {
        email: 'incorrect@mail.com',
        password: 'a234567',
    }
    const res = await request(app).post('/users/login').send(credentials);
    expect(res.status).toBe(401);
});

test('GET/ debe traer todos los usuarios', async () => {
    const res = await request(app).get('/users').set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT/ users/:id debe actualizar un usuario', async () => {
    const userUpdate = {
        firstName:"test user9",
    };
    const res = await request(app)
        .put(`/users/${id}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdate.firstName);
});


test('DELETE/ users/: id debe borrar un usuario', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});