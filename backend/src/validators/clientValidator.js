const { body } = require('express-validator');
const { validateRut } = require('../utils/validateRut');

const createClientValidation = [
    body('rut')
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
        .withMessage('El nombre es obligatorio'),

    body('email')
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('Debe ingresar un email válido'),

    body('telefono')
        .optional({ checkFalsy: true })
        .matches(/^(\+?56)?9\d{8}$/)
        .withMessage('Ingrese un celular chileno válido')
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
        .withMessage('Debe ingresar un email válido'),

    body('telefono')
        .optional({ checkFalsy: true })
        .matches(/^(\+?56)?9\d{8}$/)
        .withMessage('Ingrese un celular chileno válido')
];

module.exports = {
    createClientValidation,
    updateClientValidation
};