const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { authenticateToken } = require('../middleware/auth');

// Create a new project
router.post('/', authenticateToken, async (req, res) => {
  const project = new Project({ title: req.body.title });
  try {
    const savedProject = await project.save();
    res.status(201).send(savedProject);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add a new todo
router.post('/:projectId/todos', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    project.todos.push(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Other CRUD operations for projects and todos...

module.exports = router;
