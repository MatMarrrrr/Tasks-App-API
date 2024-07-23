const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.put('/:taskId', protect, updateTask);
router.delete('/:taskId', protect, deleteTask);

module.exports = router;