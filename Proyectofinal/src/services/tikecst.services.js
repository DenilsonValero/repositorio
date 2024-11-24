// src/services/tickets.service.js
const ticketsDAO = require('../dao/tickets.dao');
const { v4: uuidv4 } = require('uuid');

class TicketsService {
    async createTicket({ amount, purchaser }) {
        const ticket = {
            code: uuidv4(),
            amount,
            purchaser
        };
        return ticketsDAO.create(ticket);
    }
}

module.exports = new TicketsService();
