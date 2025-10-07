const express = require('express');
const { 
  createTask, 
  getTasks, 
  getTask, 
  updateTask, 
  deleteTask 
} = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');
const { validateTask } = require('../middleware/validation');

const router = express.Router();

router.use(authenticateToken);

router.post('/', validateTask, createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;