// tests/integration.test.js
// Pruebas de integración para maxercise-api
// Requiere: jest, supertest

import request from 'supertest';
import app from '../src/app.js'; // Importa el app de Express directamente
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let adminToken = '';
let userToken = '';
let createdExerciseId = null;
let createdRoutineId = null;
let createdMuscleId = null;
let createdRestrictionId = null;

// Datos de prueba
const adminUser = {
  first_name: 'Admin',
  last_name: 'Test',
  email: 'admin_test@example.com',
  password: 'Admin1234!',
  phone_number: '5551112222',
  role: 'SUPER'
};
const normalUser = {
  first_name: 'User',
  last_name: 'Test',
  email: 'user_test@example.com',
  password: 'User1234!',
  phone_number: '5553334444',
  role: 'NORMAL'
};

// Ajuste de endpoints y payloads para alinearse a los controladores y middlewares actuales
// Cambia '/api/' por '/admin/' donde corresponda y asegura los campos requeridos

describe('Flujo de integración: Admin y Usuario', () => {
  beforeAll(async () => {
    try {
      // 1. Limpiar primero las tablas hijas/intermedias (las que tienen referencias a otras)
      await prisma.routineExercise.deleteMany();
      await prisma.exerciseMuscles.deleteMany();
      await prisma.exerciseRestrictions.deleteMany();
      await prisma.userRestrictions.deleteMany();
      
      // 2. Limpiar las tablas principales
      await prisma.routine.deleteMany();
      await prisma.exercise.deleteMany();
      await prisma.muscle.deleteMany();
      await prisma.muscleGroups.deleteMany();
      await prisma.restriction.deleteMany();
      
      // 3. Por último, limpiar los usuarios (ya que casi todas las tablas dependen de author_id)
      await prisma.user.deleteMany();
      
      console.log("Base de datos de prueba limpiada con éxito.");
    } catch (error) {
      console.error("Error limpiando la BD. ¿Aplicaste las migraciones?", error.message);
    }
  });

  // Registro y login de admin
  test('Registrar usuario admin', async () => {
    const res = await request(app)
      .post('/user/register')
      .send(adminUser);
    if (res.statusCode >= 400) {
        console.log("💥 ERROR AL REGISTRAR ADMIN:", res.body);
    }
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    expect(res.statusCode).toBeLessThan(300);
    expect(res.body.data).toBeDefined();
  });
  test('Login admin', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ email: adminUser.email, password: adminUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
    adminToken = res.body.data.token;
  });

  // Registro y login de usuario normal
  test('Registrar usuario normal', async () => {
    const res = await request(app)
      .post('/user/register')
      .send(normalUser);
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    expect(res.statusCode).toBeLessThan(300);
    expect(res.body.data).toBeDefined();
  });
  test('Login usuario normal', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ email: normalUser.email, password: normalUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
    userToken = res.body.data.token;
  });

  // ADMIN: Crear 2 grupos musculares
  let muscleGroupIds = [];
  test('Admin puede crear grupos musculares', async () => {
    for (let i = 1; i <= 2; i++) {
      const res = await request(app)
        .post('/admin/muscle_groups')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ 
          name: `Grupo Muscular ${i} de Integración`,
          description: `Descripción del grupo muscular de integración número ${i}, usado para pruebas automáticas.`,
        });
      if (res.statusCode >= 400) {
        console.log(`💥 ERROR AL CREAR MUSCLE_GROUP ${i}:`, res.statusCode, res.body);
      }
      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body.data).toBeDefined();
      muscleGroupIds.push(res.body.data.id);
    }
  });

  // ADMIN: Crear 10 músculos
  let muscleIds = [];
  test('Admin puede crear 10 músculos', async () => {
    for (let i = 1; i <= 10; i++) {
      const res = await request(app)
        .post('/admin/muscles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: `Músculo Integración ${i}`,
          description: `Descripción del músculo de integración número ${i}, usado para pruebas automáticas.`,
          muscle_group_id: muscleGroupIds[i % 2],
        });
      if (res.statusCode >= 400) {
        console.log(`💥 ERROR AL CREAR MUSCLE ${i}:`, res.statusCode, res.body);
      }
      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body.data).toBeDefined();
      muscleIds.push(res.body.data.id);
    }
  });

  // ADMIN: Crear 10 restricciones
  let restrictionIds = [];
  test('Admin puede crear 10 restricciones', async () => {
    for (let i = 1; i <= 10; i++) {
      const res = await request(app)
        .post('/admin/restrictions')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: `Restricción Integración ${i}`,
          description: `Descripción de la restricción de integración número ${i}, usada para pruebas automáticas.`,
        });
      if (res.statusCode >= 400) {
        console.log(`💥 ERROR AL CREAR RESTRICTION ${i}:`, res.statusCode, res.body);
      }
      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body.data).toBeDefined();
      restrictionIds.push(res.body.data.id);
    }
  });

  // ADMIN: Crear 10 ejercicios
  let exerciseIds = [];
  test('Admin puede crear 10 ejercicios', async () => {
    for (let i = 1; i <= 10; i++) {
      const res = await request(app)
        .post('/admin/exercises')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: `Ejercicio Integración ${i}`,
          description: `Descripción del ejercicio de integración número ${i}, usado para pruebas automáticas.`,
          instructions: `Estas son las instrucciones detalladas para el ejercicio de integración número ${i}. Deben tener más de veinticinco caracteres para pasar la validación.`,
          imageUrl: `https://img.com/${i}.jpg`,
          muscle_id: muscleIds[i % 10],
        });
      if (res.statusCode >= 400) {
        console.log(`💥 ERROR AL CREAR EXERCISE ${i}:`, res.statusCode, res.body);
      }
      expect(res.statusCode).toBeGreaterThanOrEqual(200);
      expect(res.statusCode).toBeLessThan(300);
      expect(res.body.data.result).toBeDefined();
      exerciseIds.push(res.body.data.result.id);
    }
  });

  // ADMIN: Crear rutina y asociar ejercicios
  let routineId = null;
  test('Admin puede crear rutina y asociar ejercicios', async () => {
    const res = await request(app)
      .post('/admin/routines')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Rutina Integración Completa',
        description: 'Esta es una rutina de integración para pruebas automáticas. Cumple con la longitud mínima requerida.',
        difficulty: 'PRINCIPIANTE',
        body_type: 'ECTOMORFO',
        author_id: 1
      });
    if (res.statusCode >= 400) {
      console.log('💥 ERROR AL CREAR ROUTINE:', res.statusCode, res.body);
    }
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    expect(res.statusCode).toBeLessThan(300);
    expect(res.body.data).toBeDefined();
    routineId = res.body.data.id;

    // Asociar ejercicios a la rutina
    for (let i = 0; i < exerciseIds.length; i++) {
      const reRes = await request(app)
        .post('/admin/routine_exercises')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          reps: 10,
          sets: 3,
          routine_id: routineId,
          exercise_id: exerciseIds[i],
        });
      if (reRes.statusCode >= 400) {
        console.log(`💥 ERROR AL ASOCIAR ROUTINE_EXERCISE ${i}:`, reRes.statusCode, reRes.body);
      }
      expect(reRes.statusCode).toBeGreaterThanOrEqual(200);
      expect(reRes.statusCode).toBeLessThan(300);
      expect(reRes.body.data).toBeDefined();
    }
  });

  // USUARIO: Consultar ejercicios
  test('Usuario puede consultar ejercicios', async () => {
    const res = await request(app)
      .get('/user/exercises')
      .set('Authorization', `Bearer ${userToken}`);
    if (res.statusCode >= 400) {
      console.log('💥 ERROR AL CONSULTAR EXERCISES:', res.statusCode, res.text);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  // USUARIO: Consultar músculos
  test('Usuario puede consultar músculos', async () => {
    const res = await request(app)
      .get('/user/muscles')
      .set('Authorization', `Bearer ${userToken}`);
    if (res.statusCode >= 400) {
      console.log('💥 ERROR AL CONSULTAR MUSCLES:', res.statusCode, res.text);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  // USUARIO: Consultar rutinas
  test('Usuario puede consultar rutinas', async () => {
    const res = await request(app)
      .get('/user/routines')
      .set('Authorization', `Bearer ${userToken}`);
    if (res.statusCode >= 400) {
      console.log('💥 ERROR AL CONSULTAR ROUTINES:', res.statusCode, res.text);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  // USUARIO: Consultar restricciones
  test('Usuario puede consultar restricciones', async () => {
    const res = await request(app)
      .get('/user/restrictions')
      .set('Authorization', `Bearer ${userToken}`);
    if (res.statusCode >= 400) {
      console.log('💥 ERROR AL CONSULTAR RESTRICTIONS:', res.statusCode, res.text);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  // Notificación de errores/fallos
  afterEach(async () => {
    // Si alguna prueba falla, Jest lo notificará automáticamente
  });
});
