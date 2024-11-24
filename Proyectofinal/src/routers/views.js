const express = require('express');
const fs = require('fs');
const router = express.Router();

const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

router.get('/', (req, res) => {
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

module.exports = router;