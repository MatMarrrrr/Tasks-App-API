const taskService = require("../services/task.service");

const createTask = async (req, res) => {
  try {
    const { name, type, groupId } = req.body;
    const task = await taskService.createTask(req.user._id, name, type, groupId);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUser(req.user._id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTasksByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const tasks = await taskService.getTasksByGroup(groupId, req.user._id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updateData = req.body;
    updateData.userId = req.user._id;
    const task = await taskService.updateTask(taskId, updateData);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await taskService.deleteTask(taskId, req.user._id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTasksByGroup,
};
