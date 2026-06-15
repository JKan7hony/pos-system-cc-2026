const { body } = require('express-validator');
const validateRut = require('../utils/validateRut');
// Validaciones para creación y actualización de clientes
const createClientValidation = [

    body('rut')
        .trim()
        .notEmpty()
        .withMessage('El RUT es obligatorio')
        .custom((value) => {

            if (!validateRut(value)) {
            throw new Error('RUT chileno inválido');
            }

            return true;
        }),

    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre debe tener entre 3 y 100 caracteres'),

    body('email')
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('Email inválido'),

    body('telefono')
        .optional({ checkFalsy: true })
        .isLength({ min: 8, max: 20 })
        .withMessage('Teléfono inválido')

];

const updateClientValidation = [

    body('nombre')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre debe tener entre 3 y 100 caracteres'),

    body('email')
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('Email inválido'),

    body('telefono')
        .optional({ checkFalsy: true })
        .isLength({ min: 8, max: 20 })
        .withMessage('Teléfono inválido')
];

module.exports = {
    createClientValidation,
    updateClientValidation
};