const { body } = require('express-validator');

const createSaleValidation = [

    body('cliente_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Cliente inválido'),

    body('metodo_pago')
        .optional()
        .isIn([
            'efectivo',
            'debito',
            'credito',
            'transferencia'
        ])
    .withMessage('Método de pago inválido'),

    body('items')
        .isArray({ min: 1 })
        .withMessage('Debe existir al menos un producto'),

    body('items.*.producto_id')
        .isInt({ min: 1 })
        .withMessage('Producto inválido'),

    body('items.*.cantidad')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser mayor a 0'),

    body('items.*.precio_unitario')
        .isFloat({ min: 0 })
        .withMessage('Precio inválido')

];

module.exports = {
    createSaleValidation
};