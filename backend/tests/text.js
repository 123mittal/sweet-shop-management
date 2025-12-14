const request = require('supertest');
const app = require('../app'); // path to your app.js

describe('GET /api/sweets', () => {
  it('should return an array', async () => {
    const res = await request(app).get('/api/sweets');
    expect(Array.isArray(res.body)).toBe(true);  
    expect(res.statusCode).toBe(200);       
  });
});

//test to create new sweet
describe('POST/api/sweets',()=>{
    it('should create a new sweet',async()=>{
        const newSweet = {name:'Rasgulla',category: 'Milk', price: 25, quantity: 10 };
        const res = await request(app)
        .post('/api/sweets')
        .send(newSweet);

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Rasgulla');
        expect(res.body.quantity).toBe(10);
    })

it('should fail if any field is missing',async()=>{
    const res = await request(app)
    .post('/api/sweets')
    .send({name:'Ladoo'});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are mandatory");
    });
});

//test to update the sweet

describe('/api/sweets/:id',()=>{
  it('should update an existing sweet',async()=>{
    const updatedData = {price:30,quantity:30};
    const res = await request(app)
    .put('/api/sweets/1')
    .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(30);
    expect(res.body.quantity).toBe(30);
  });

  it('should return 404  if sweet does not exist',async ()=>{
    const res = await request(app)
    .put('/api/sweets/999')
    .send({price:50});

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("sweet not exist");

  });
});

//test to delete the sweet
describe('/api/sweets/:id',()=>{
  it('should delete an existing sweet',async()=>{
const res = await request (app)
.delete('/api/sweets/1')

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('sweet deleted Successfully!!')
  });

  it('should return 404 if sweet does not exist',async()=>{
    const res = await request(app)
    .delete('/api/sweets/999')

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("sweet not found")
  });
});

//test for purchase of sweet
describe('/api/sweets/:id/purchase',()=>{
  it('should decrease sweet quantity by 1', async()=>{
    const res = await request(app)
    .post('/api/sweets/2/purchase');

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(4) //if 5 is qty
  })
   it('should return 400 if sweet is out of stock', async()=>{
    //you can't use res in this put if u do this will record response of put not post
    await request(app)
    .put('/api/sweets/2')
    .send({quantity:0});

    const res = await request(app)
    .post('/api/sweets/2/purchase');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('sweet is out of stock');
  }) 

  it('should return 404 sweet does not exist',async()=>{
    const res = await request(app)
    .post('/api/sweets/999/purchase')

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('sweet not found')
  });
});

//test case for filter

describe('GET /api/sweets/search', () => {
  it('should return sweets matching name', async () => {
    const res = await request(app).get('/api/sweets/search?name=Gulab');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toContain('Gulab');
  });

  it('should return sweets matching category', async () => {
    const res = await request(app).get('/api/sweets/search?category=Milk');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].category).toContain('Milk');
  });

  it('should return sweets within price range', async () => {
    const res = await request(app).get('/api/sweets/search?minPrice=10&maxPrice=25');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(s => {
      expect(s.price).toBeGreaterThanOrEqual(10);
      expect(s.price).toBeLessThanOrEqual(25);
    });
  });

  it('should return sweets matching multiple filters', async () => {
    const res = await request(app).get('/api/sweets/search?name=Gulab&category=Milk&minPrice=10&maxPrice=25');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(s => {
      expect(s.name).toContain('Gulab');
      expect(s.category).toContain('Milk');
    });
  });
});