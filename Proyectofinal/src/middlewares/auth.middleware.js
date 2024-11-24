// src/middlewares/auth.middleware.js
const authMiddleware = (roles = []) => (req, res, next) => {
    const user = req.user; // Se obtiene del token JWT por Passport
    if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Acceso denegado: no tienes los permisos necesarios' });
    }
    next();
};

module.exports = authMiddleware;
