const router = require('express').Router();
const { login, me } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const { loginValidation } = require('../validators/authValidator');

router.post('/login', loginValidation, login);
router.get('/me', authMiddleware, me);

module.exports = router;
