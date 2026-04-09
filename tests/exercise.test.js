import request from 'supertest';
import app from '../src/app.js';

describe('Exercise CRUD', () => {
  let token = '';
  let groupId = null;
  let muscleId = null;
  let exerciseId = null;
  const admin = {
    first_name: 'AdminE',
    last_name: 'Test',
    email: 'admine@example.com',
    password: 'AdminE123!',
    phone_number: '5551116666',
    role: 'ADMIN'
  };

  beforeAll(async () => {
    await request(app).post('/user/register').send(admin);
    const res = await request(app).post('/user/login').send({ email: admin.email, password: admin.password });
    token = res.body.data.token;
    // Crear grupo muscular y músculo necesarios
    const mgRes = await request(app)
      .post('/admin/muscle_groups')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Grupo Muscular Integración', description: 'Descripción del grupo muscular de integración para pruebas automáticas.' }); // >=6 y <=50, >=16 y <=300
    groupId = mgRes.body.data.result.id;
    const mRes = await request(app)
      .post('/admin/muscles')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Músculo Integración', description: 'Descripción del músculo de integración para pruebas automáticas.', muscle_group_id: groupId }); // >=6 y <=50, >=16 y <=300
    muscleId = mRes.body.data.result.id;
  });

  test('Crear ejercicio', async () => {
    const res = await request(app)
      .post('/admin/exercises')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Ejercicio Integración', description: 'Descripción del ejercicio de integración para pruebas automáticas.', instructions: 'Estas son las instrucciones detalladas para el ejercicio de integración. Deben tener más de veinticinco caracteres para pasar la validación.', imageUrl: 'https://img.com/ej.jpg', muscle_id: muscleId }); // >=6 y <=50, >=16 y <=300, >=26 y <=2000
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
    exerciseId = res.body.data.result.id;
  });

  test('Consultar ejercicios', async () => {
    const res = await request(app)
      .get('/admin/exercises')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
  });

  test('Actualizar ejercicio', async () => {
    const res = await request(app)
      .put(`/admin/exercises/${exerciseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Ejercicio Integración Actualizado', description: 'Descripción actualizada del ejercicio de integración para pruebas automáticas.', instructions: 'Estas son las instrucciones actualizadas para el ejercicio de integración. Deben tener más de veinticinco caracteres para pasar la validación.', imageUrl: 'https://img.com/ej.jpg', muscle_id: muscleId }); // >=6 y <=50, >=16 y <=300, >=26 y <=2000
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  test('Eliminar ejercicio', async () => {
    const res = await request(app)
      .delete(`/admin/exercises/${exerciseId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
