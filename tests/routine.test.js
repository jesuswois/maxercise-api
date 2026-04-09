import request from 'supertest';
import app from '../src/app.js';

describe('Routine CRUD', () => {
  let token = '';
  let routineId = null;
  let exerciseId = null;
  const admin = {
    first_name: 'AdminRT',
    last_name: 'Test',
    email: 'adminrt@example.com',
    password: 'AdminRT123!',
    phone_number: '5551117777',
    role: 'ADMIN'
  };

  beforeAll(async () => {
    await request(app).post('/user/register').send(admin);
    const res = await request(app).post('/user/login').send({ email: admin.email, password: admin.password });
    token = res.body.data.token;
    // Crear ejercicio necesario
    const mgRes = await request(app)
      .post('/admin/muscle_groups')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Grupo Muscular Integración', description: 'Descripción del grupo muscular de integración para pruebas automáticas.' }); // >=6 y <=50, >=16 y <=300
    const mRes = await request(app)
      .post('/admin/muscles')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Músculo Integración', description: 'Descripción del músculo de integración para pruebas automáticas.', muscle_group_id: mgRes.body.data.result.id }); // >=6 y <=50, >=16 y <=300
    const eRes = await request(app)
      .post('/admin/exercises')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Ejercicio Integración', description: 'Descripción del ejercicio de integración para pruebas automáticas.', instructions: 'Estas son las instrucciones detalladas para el ejercicio de integración. Deben tener más de veinticinco caracteres para pasar la validación.', imageUrl: 'https://img.com/rt.jpg', muscle_id: mRes.body.data.result.id }); // >=6 y <=50, >=16 y <=300, >=26 y <=2000
    exerciseId = eRes.body.data.result.id;
  });

  test('Crear rutina', async () => {
    const res = await request(app)
      .post('/admin/routines')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Rutina Integración', description: 'Descripción de la rutina de integración para pruebas automáticas.', difficulty: 'PRINCIPIANTE', body_type: 'ECTOMORFO', author_id: 1 }); // >=6 y <=50, >=16 y <=300
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
    routineId = res.body.data.result.id;
  });

  test('Consultar rutinas', async () => {
    const res = await request(app)
      .get('/admin/routines')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
  });

  test('Actualizar rutina', async () => {
    const res = await request(app)
      .put(`/admin/routines/${routineId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Rutina Integración Actualizada', description: 'Descripción actualizada de la rutina de integración para pruebas automáticas.', difficulty: 'PRINCIPIANTE', body_type: 'ECTOMORFO', author_id: 1 }); // >=6 y <=50, >=16 y <=300
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  test('Eliminar rutina', async () => {
    const res = await request(app)
      .delete(`/admin/routines/${routineId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
