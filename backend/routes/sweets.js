const express = require('express');
const router = express.Router();
const db = require('../db'); // MySQL connection

// GET all sweets
router.get('/', (req, res) => {
  db.query('SELECT * FROM sweets', (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    // Convert price to number
    const sweets = results.map(s => ({ ...s, price: Number(s.price) }));
    res.json(sweets);
  });
});

// POST add new sweet
router.post('/', (req, res) => {
  const { name, category, price, quantity } = req.body;
  if (!name || !category || !price || !quantity) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  const sql = 'INSERT INTO sweets (name, category, price, quantity) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, category, price, quantity], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    db.query('SELECT * FROM sweets WHERE id = ?', [result.insertId], (err2, rows) => {
      if (err2) return res.status(500).json({ message: err2.message });
      const sweet = { ...rows[0], price: Number(rows[0].price) };
      res.status(201).json(sweet);
    });
  });
});

// PUT update sweet
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category, price, quantity } = req.body;

  db.query('SELECT * FROM sweets WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (rows.length === 0) return res.status(404).json({ message: 'sweet not exist' });

    const sweet = rows[0];
    const updatedName = name ?? sweet.name;
    const updatedCategory = category ?? sweet.category;
    const updatedPrice = price ?? sweet.price;
    const updatedQuantity = quantity ?? sweet.quantity;

    const sql = 'UPDATE sweets SET name = ?, category = ?, price = ?, quantity = ? WHERE id = ?';
    db.query(sql, [updatedName, updatedCategory, updatedPrice, updatedQuantity, id], (err2) => {
      if (err2) return res.status(500).json({ message: err2.message });

      db.query('SELECT * FROM sweets WHERE id = ?', [id], (err3, updatedRows) => {
        if (err3) return res.status(500).json({ message: err3.message });
        const updatedSweet = { ...updatedRows[0], price: Number(updatedRows[0].price) };
        res.json(updatedSweet);
      });
    });
  });
});

// DELETE sweet
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM sweets WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'sweet not found' });
    res.json({ message: 'sweet deleted Successfully!!' });
  });
});

// PURCHASE sweet
router.post('/:id/purchase', (req, res) => {
  const id = parseInt(req.params.id);
  db.query('SELECT * FROM sweets WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (rows.length === 0) return res.status(404).json({ message: 'sweet not found' });

    const sweet = rows[0];
    if (sweet.quantity <= 0) return res.status(400).json({ message: 'sweet is out of stock' });

    db.query('UPDATE sweets SET quantity = quantity - 1 WHERE id = ?', [id], (err2) => {
      if (err2) return res.status(500).json({ message: err2.message });
      db.query('SELECT * FROM sweets WHERE id = ?', [id], (err3, updatedRows) => {
        if (err3) return res.status(500).json({ message: err3.message });
        const updatedSweet = { ...updatedRows[0], price: Number(updatedRows[0].price) };
        res.json(updatedSweet);
      });
    });
  });
});

// SEARCH sweets by name, category, or price range
// GET /api/sweets/search?name=rasgulla&category=milk&minPrice=10&maxPrice=50
router.get('/search', (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  let sql = 'SELECT * FROM sweets WHERE 1=1';
  const params = [];

  if (name) {
    sql += ' AND name LIKE ?';
    params.push(`%${name}%`);
  }
  if (category) {
    sql += ' AND category LIKE ?';
    params.push(`%${category}%`);
  }
  if (minPrice) {
    sql += ' AND price >= ?';
    params.push(minPrice);
  }
  if (maxPrice) {
    sql += ' AND price <= ?';
    params.push(maxPrice);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    const sweets = results.map(s => ({ ...s, price: Number(s.price) }));
    res.json(sweets);
  });
});

module.exports = router;
