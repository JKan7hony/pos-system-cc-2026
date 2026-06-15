const router = require('express').Router();
const ctrl = require('../controllers/clientController');
const { authMiddleware } = require('../middleware/auth');
const {
    createClientValidation,
    updateClientValidation
} = require('../validators/clientValidator');

router.get('/',       authMiddleware, ctrl.getAll);
router.get('/:id',    authMiddleware, ctrl.getById);
router.post(
    '/',
    authMiddleware,
    createClientValidation,
    ctrl.create
);
router.put(
    '/:id',
    authMiddleware,
    updateClientValidation,
    ctrl.update
);
router.delete('/:id', authMiddleware, ctrl.remove);

module.exports = router;
