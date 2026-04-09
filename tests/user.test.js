import request from 'supertest';
import app from '../src/app.js';

describe('User CRUD', () => {
  let token = '';
  let userId = null;
  const user = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test_user@example.com',
    password: 'Test1234!',
    phone_number: '5550001111',
    role: 'NORMAL'
  };

  test('Registrar usuario', async () => {
    const res = await request(app)
      .post('/user/register')
      .send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
    userId = res.body.data.id || res.body.data.result?.id;
  });

  test('Login usuario', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ email: user.email, password: user.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
    token = res.body.data.token;
  });

  test('Consultar perfil', async () => {
    const res = await request(app)
      .get(`/user/profile`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  test('Actualizar usuario', async () => {
    const res = await request(app)
      .put(`/user/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ first_name: 'TestUpdated' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });
});
