const Task = require("../models/task.model");
const User = require("../models/user.model");
const Group = require("../models/group.model");

class TaskService {
  async createTask(userId, name, type, groupId = null) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (groupId) {
      const group = await Group.findById(groupId);
      if (!group) {
        throw new Error("Group not found");
      }
      if (
        !group.members.includes(userId) &&
        group.author.toString() !== userId
      ) {
        throw new Error("User not authorized to create a task in this group");
      }
    }

    const task = new Task({
      name,
      type,
      user: userId,
      group: groupId,
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
      return [];
    }

    return tasks.map((task) => ({
      id: task._id,
      name: task.name,
      type: task.type,
      created_at: task.created_at,
      updated_at: task.updated_at,
    }));
  }

  async getTasksByGroup(groupId, userId) {
    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error("Group not found");
    }

    if (!group.members.includes(userId) && group.author.toString() !== userId) {
      throw new Error("User not authorized to view tasks in this group");
    }

    const tasks = await Task.find({ group: groupId });

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

    if (task.group) {
      const group = await Group.findById(task.group);
      if (
        !group.members.includes(updateData.userId) &&
        group.author.toString() !== updateData.userId
      ) {
        throw new Error("User not authorized to update this task");
      }
    } else if (task.user.toString() !== updateData.userId.toString()) {
      throw new Error("User not authorized to update this task");
    }

    Object.assign(task, updateData, {
      updated_at: new Date(),
      lastEditedBy: updateData.userId,
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

  async deleteTask(taskId, userId) {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.group) {
      const group = await Group.findById(task.group);
      if (
        !group.members.includes(userId) &&
        group.author.toString() !== userId
      ) {
        throw new Error("User not authorized to delete this task");
      }
    } else if (task.user.toString() !== userId.toString()) {
      throw new Error("User not authorized to delete this task");
    }

    await Task.deleteOne({ _id: taskId });

    return { message: "Task deleted successfully" };
  }
}

module.exports = new TaskService();
