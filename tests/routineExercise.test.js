import request from 'supertest';
import app from '../src/app.js';

describe('RoutineExercise CRUD', () => {
  let token = '';
  let routineId = null;
  let exerciseId = null;
  let routineExerciseId = null;
  const admin = {
    first_name: 'AdminRE',
    last_name: 'Test',
    email: 'adminre@example.com',
    password: 'AdminRE123!',
    phone_number: '5551118888',
    role: 'ADMIN'
  };

  beforeAll(async () => {
    await request(app).post('/user/register').send(admin);
    const res = await request(app).post('/user/login').send({ email: admin.email, password: admin.password });
    token = res.body.data.token;
    // Crear rutina y ejercicio necesarios
    const mgRes = await request(app)
      .post('/admin/muscle_groups')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'MG5', description: 'Grupo muscular 5' });
    const mRes = await request(app)
      .post('/admin/muscles')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'MusculoRE', description: 'Desc musculo RE', muscle_group_id: mgRes.body.data.result.id });
    const eRes = await request(app)
      .post('/admin/exercises')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'EjercicioRE', description: 'Desc ejercicio RE', instructions: 'Hazlo así', imageUrl: 'https://img.com/re.jpg', muscle_id: mRes.body.data.result.id });
    exerciseId = eRes.body.data.result.id;
    const rRes = await request(app)
      .post('/admin/routines')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'RutinaRE', description: 'Desc rutina RE', difficulty: 'PRINCIPIANTE', body_type: 'ECTOMORFO', author_id: 1 });
    routineId = rRes.body.data.result.id;
  });

  test('Crear ejercicio de rutina', async () => {
    const res = await request(app)
      .post('/admin/routine_exercises')
      .set('Authorization', `Bearer ${token}`)
      .send({ reps: 10, sets: 3, routine_id: routineId, exercise_id: exerciseId });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
    routineExerciseId = res.body.data.result.id;
  });

  test('Consultar ejercicios de rutina', async () => {
    const res = await request(app)
      .get(`/admin/routine_exercises/${routineId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.result).toBeDefined();
  });

  test('Actualizar ejercicio de rutina', async () => {
    const res = await request(app)
      .put(`/admin/routine_exercises/${routineExerciseId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ reps: 12, sets: 4 });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  test('Eliminar ejercicio de rutina', async () => {
    const res = await request(app)
      .delete(`/admin/routine_exercises/${routineExerciseId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
