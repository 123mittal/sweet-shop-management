const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach((done) => {
  // Reset the sweets table before each test
  db.query('DELETE FROM sweets', (err) => {
    if (err) return done(err);

    db.query(
      `INSERT INTO sweets (id, name, category, price, quantity) VALUES 
      (1, 'Gulab Jamun', 'Milk', 20, 10),
      (2, 'Ladoo', 'Flour', 15, 5)`,
      done
    );
  });
});

afterAll((done) => {
  db.end(done); // Close DB connection after all tests
});

describe('GET /api/sweets', () => {
  it('should return an array', async () => {
    const res = await request(app).get('/api/sweets');
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /api/sweets', () => {
  it('should create a new sweet', async () => {
    const newSweet = { name: 'Rasgulla', category: 'Milk', price: 25, quantity: 10 };
    const res = await request(app).post('/api/sweets').send(newSweet);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Rasgulla');
    expect(res.body.quantity).toBe(10);
  });

  it('should fail if any field is missing', async () => {
    const res = await request(app).post('/api/sweets').send({ name: 'Ladoo' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('All fields are mandatory');
  });
});

describe('PUT /api/sweets/:id', () => {
  it('should update an existing sweet', async () => {
    const updatedData = { price: 30, quantity: 30 };
    const res = await request(app).put('/api/sweets/1').send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(Number(res.body.price)).toBe(30); // Convert string to number if MySQL returns "30.00"
    expect(res.body.quantity).toBe(30);
  });

  it('should return 404 if sweet does not exist', async () => {
    const res = await request(app).put('/api/sweets/999').send({ price: 50 });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('sweet not exist');
  });
});

describe('DELETE /api/sweets/:id', () => {
  it('should delete an existing sweet', async () => {
    const res = await request(app).delete('/api/sweets/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('sweet deleted Successfully!!');
  });

  it('should return 404 if sweet does not exist', async () => {
    const res = await request(app).delete('/api/sweets/999');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('sweet not found');
  });
});

describe('POST /api/sweets/:id/purchase', () => {
  it('should decrease sweet quantity by 1', async () => {
    const res = await request(app).post('/api/sweets/2/purchase');
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(4); // 5 - 1
  });

  it('should return 400 if sweet is out of stock', async () => {
    await request(app).put('/api/sweets/2').send({ quantity: 0 }); // Set quantity to 0
    const res = await request(app).post('/api/sweets/2/purchase');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('sweet is out of stock');
  });

  it('should return 404 if sweet does not exist', async () => {
    const res = await request(app).post('/api/sweets/999/purchase');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('sweet not found');
  });
});

describe('GET /api/sweets/search', () => {
  it('should return sweets matching the name', async () => {
    const res = await request(app).get('/api/sweets/search?name=Gulab');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toContain('Gulab');
  });

  it('should return sweets matching the category', async () => {
    const res = await request(app).get('/api/sweets/search?category=Milk');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].category).toContain('Milk');
  });

  it('should return sweets within a price range', async () => {
    const res = await request(app).get('/api/sweets/search?minPrice=10&maxPrice=25');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(sweet => {
      expect(Number(sweet.price)).toBeGreaterThanOrEqual(10);
      expect(Number(sweet.price)).toBeLessThanOrEqual(25);
    });
  });

  it('should return sweets matching multiple filters', async () => {
    const res = await request(app).get('/api/sweets/search?name=Gulab&category=Milk&minPrice=10&maxPrice=25');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(s => {
      expect(s.name).toContain('Gulab');
      expect(s.category).toContain('Milk');
      expect(Number(s.price)).toBeGreaterThanOrEqual(10);
      expect(Number(s.price)).toBeLessThanOrEqual(25);
    });
  });
});
