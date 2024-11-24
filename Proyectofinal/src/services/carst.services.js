// src/services/carts.service.js
const cartsDAO = require('../dao/carts.dao');
const productsDAO = require('../dao/products.dao');
const ticketsService = require('../services/tickets.service');

class CartsService {
    async finalizePurchase(cartId, userEmail) {
        const cart = await cartsDAO.getById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        let total = 0;
        const remainingProducts = [];

        for (const item of cart.products) {
            const product = await productsDAO.getById(item.productId);
            if (product.stock >= item.quantity) {
                total += product.price * item.quantity;
                product.stock -= item.quantity;
                await productsDAO.update(product._id, { stock: product.stock });
            } else {
                remainingProducts.push(item);
            }
        }

        cart.products = remainingProducts;
        await cartsDAO.update(cart._id, cart);

        if (total > 0) {
            const ticket = await ticketsService.createTicket({
                amount: total,
                purchaser: userEmail
            });
            return { message: 'Compra realizada', ticket };
        }

        return { message: 'No se pudo completar la compra', remainingProducts };
    }
}

module.exports = new CartsService();
