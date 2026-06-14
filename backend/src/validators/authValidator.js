const { body } = require('express-validator');

const loginValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Debe ingresar un email válido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres')
];

module.exports = {
    loginValidation
};
