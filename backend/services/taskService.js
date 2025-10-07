const Task = require('../models/Task');

const createTask = async (taskData, userId) => {
  const task = new Task({
    ...taskData,
    user: userId
  });
  return await task.save();
};

const getAllTasks = async (userId) => {
  return await Task.find({ user: userId }).sort({ createdAt: -1 });
};

const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updateData,
    { new: true, runValidators: true }
  );
  
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};