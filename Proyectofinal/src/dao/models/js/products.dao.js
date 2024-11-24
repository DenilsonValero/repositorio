// src/dao/products.dao.js
const Product = require('../models/Product');

class ProductsDAO {
    async getAll() {
        return Product.find();
    }

    async getById(pid) {
        return Product.findById(pid);
    }

    async create(product) {
        return Product.create(product);
    }

    async update(pid, data) {
        return Product.findByIdAndUpdate(pid, data, { new: true });
    }

    async delete(pid) {
        return Product.findByIdAndDelete(pid);
    }
}

module.exports = new ProductsDAO();
