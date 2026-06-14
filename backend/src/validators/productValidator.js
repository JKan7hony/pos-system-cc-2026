const { body } = require('express-validator');

const createProductValidation = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre debe tener entre 3 y 100 caracteres'),

    body('precio')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0'),

    body('stock')
        .notEmpty()
        .withMessage('El stock es obligatorio')
        .isInt({ min: 0 })
        .withMessage('El stock debe ser mayor o igual a 0'),

    body('categoria_id')
        .optional()
        .isInt()
        .withMessage('La categoría debe ser numérica')
];

const updateProductValidation = [
    body('nombre')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 }),

    body('precio')
        .optional()
        .isFloat({ min: 0 }),

    body('stock')
        .optional()
        .isInt({ min: 0 }),

    body('categoria_id')
        .optional()
        .isInt()
];

module.exports = {
    createProductValidation,
    updateProductValidation
};