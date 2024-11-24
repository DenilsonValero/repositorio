// src/dao/tickets.dao.js
const Ticket = require('../models/Ticket');

class TicketsDAO {
    async create(ticket) {
        return Ticket.create(ticket);
    }
}

module.exports = new TicketsDAO();

