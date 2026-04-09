import request from 'supertest';
import app from '../src/app.js';

describe('Restriction CRUD', () => {
  let token = '';
  let restrictionId = null;
  const admin = {
    first_name: 'AdminR',
    last_name: 'Test',
    email: 'adminr@example.com',
    password: 'AdminR123!',
    phone_number: '5551115555',
    role: 'ADMIN'
  };

  beforeAll(async () => {
    await request(app).post('/user/register').send(admin);
    const res = await request(app).post('/user/login').send({ email: admin.email, password: admin.password });
    token = res.body.data.token;
  });

  test('Crear restricción', async () => {
    const res = await request(app)
      .post('/admin/restrictions')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Restricción Integración', description: 'Descripción de la restricción de integración para pruebas automáticas.' }); // >=6 y <=50, >=16 y <=300
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
    restrictionId = res.body.data.result.id;
  });

  test('Consultar restricciones', async () => {
    const res = await request(app)
      .get('/admin/restrictions')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
  });

  test('Actualizar restricción', async () => {
    const res = await request(app)
      .put(`/admin/restrictions/${restrictionId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Restricción Integración Actualizada', description: 'Descripción actualizada de la restricción de integración para pruebas automáticas.' }); // >=6 y <=50, >=16 y <=300
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  test('Eliminar restricción', async () => {
    const res = await request(app)
      .delete(`/admin/restrictions/${restrictionId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
