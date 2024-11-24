const express = require('express');
const fs = require('fs');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:pid', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

router.post('/', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

module.exports = router;