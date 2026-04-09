import request from 'supertest';
import app from '../src/app.js';

describe('Muscle CRUD', () => {
  let token = '';
  let groupId = null;
  let muscleId = null;
  const admin = {
    first_name: 'AdminM',
    last_name: 'Test',
    email: 'adminm@example.com',
    password: 'AdminM123!',
    phone_number: '5551114444',
    role: 'ADMIN'
  };

  beforeAll(async () => {
    await request(app).post('/user/register').send(admin);
    const res = await request(app).post('/user/login').send({ email: admin.email, password: admin.password });
    token = res.body.data.token;
    // Crear grupo muscular necesario
    const mgRes = await request(app)
      .post('/admin/muscle_groups')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Grupo Muscular Integración', description: 'Descripción del grupo muscular de integración para pruebas automáticas.' }); // >=6 y <=50, >=16 y <=300
    groupId = mgRes.body.data.result.id;
  });

  test('Crear músculo', async () => {
    const res = await request(app)
      .post('/admin/muscles')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Músculo Integración', description: 'Descripción del músculo de integración para pruebas automáticas.', muscle_group_id: groupId }); // >=6 y <=50, >=16 y <=300
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
    muscleId = res.body.data.result.id;
  });

  test('Consultar músculos', async () => {
    const res = await request(app)
      .get('/admin/muscles')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
  });

  test('Actualizar músculo', async () => {
    const res = await request(app)
      .put(`/admin/muscles/${muscleId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Músculo Integración Actualizado', description: 'Descripción actualizada del músculo de integración para pruebas automáticas.', muscle_group_id: groupId }); // >=6 y <=50, >=16 y <=300
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  test('Eliminar músculo', async () => {
    const res = await request(app)
      .delete(`/admin/muscles/${muscleId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
