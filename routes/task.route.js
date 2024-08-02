const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTasksByGroup, updateTask, deleteTask } = require('../controllers/task.controller');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.get('/group/:groupId', protect, getTasksByGroup);
router.put('/:taskId', protect, updateTask);
router.delete('/:taskId', protect, deleteTask);

module.exports = router;