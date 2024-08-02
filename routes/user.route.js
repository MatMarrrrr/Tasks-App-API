const express = require('express');
const router = express.Router();
const { register, login, findUsers } = require('../controllers/user.controller');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/find', protect, findUsers);

module.exports = router;