import request from 'supertest';
import app from '../src/app.js';


describe('MuscleGroup CRUD', () => {
  let token = '';
  let groupId = null;
  const admin = {
    first_name: 'AdminMG',
    last_name: 'Test',
    email: 'adminmg@example.com',
    password: 'AdminMG123!',
    phone_number: '5551113333',
    role: 'ADMIN'
  };

  beforeAll(async () => {
    await request(app).post('/user/register').send(admin);
    const res = await request(app).post('/user/login').send({ email: admin.email, password: admin.password });
    token = res.body.data.token;
  });

  test('Crear grupo muscular', async () => {
    const res = await request(app)
      .post('/admin/muscle_groups')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Grupo Muscular Integración', description: 'Descripción del grupo muscular de integración para pruebas automáticas.' }); // >=6 y <=50, >=16 y <=300
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
    groupId = res.body.data.result.id;
  });

  test('Consultar grupos musculares', async () => {
    const res = await request(app)
      .get('/admin/muscle_groups')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
  });

  test('Actualizar grupo muscular', async () => {
    const res = await request(app)
      .put(`/admin/muscle_groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Grupo Muscular Integración Actualizado', description: 'Descripción actualizada del grupo muscular de integración para pruebas automáticas.' }); // >=6 y <=50, >=16 y <=300
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  test('Eliminar grupo muscular', async () => {
    const res = await request(app)
      .delete(`/admin/muscle_groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
