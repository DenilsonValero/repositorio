// src/dto/user.dto.js
class UserDTO {
    constructor({ first_name, last_name, email, role }) {
        this.name = `${first_name} ${last_name}`;
        this.email = email;
        this.role = role;
    }
}

module.exports = UserDTO;
