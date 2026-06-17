const { body } = require('express-validator');

const createCategoryValidation = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 y 50 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s-]+$/)
        .withMessage('El nombre contiene caracteres no permitidos')
];

const updateCategoryValidation = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 y 50 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s-]+$/)
        .withMessage('El nombre contiene caracteres no permitidos')
];

module.exports = {
    createCategoryValidation,
    updateCategoryValidation
};