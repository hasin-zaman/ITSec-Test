const taskService = require('../services/taskService');

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user.userId);
    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(req.user.userId);
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.userId);
    res.json({ task });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user.userId, req.body);
    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.userId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
};