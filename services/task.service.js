const Task = require("../models/task.model");
const User = require("../models/user.model");

class TaskService {
  async createTask(userId, name, type) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const task = new Task({
      name,
      type,
      user: userId,
    });

    await task.save();

    return {
      id: task._id,
      name: task.name,
      type: task.type,
      created_at: task.created_at,
      updated_at: task.updated_at,
    };
  }

  async getTasksByUser(userId) {
    const tasks = await Task.find({ user: userId });

    if (!tasks.length) {
      return {};
    }

    return tasks.map((task) => ({
      id: task._id,
      name: task.name,
      type: task.type,
      created_at: task.created_at,
      updated_at: task.updated_at,
    }));
  }

  async updateTask(taskId, updateData) {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.user.toString() !== updateData.userId.toString()) {
      throw new Error("User not authorized to update this task");
    }

    Object.assign(task, updateData, { updated_at: new Date() });

    await task.save();

    return {
      id: task._id,
      name: task.name,
      type: task.type,
      created_at: task.created_at,
      updated_at: task.updated_at,
    };
  }

  async deleteTask(taskId) {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    await Task.deleteOne({ _id: taskId });

    return { message: "Task deleted successfully" };
  }
}

module.exports = new TaskService();
