const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../../models/Task');
const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

// All routes below are protected
router.use(protect);

// POST /api/v1/tasks
router.post(
  '/',
  [body('title').notEmpty().withMessage('Title is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description || '',
        completed: req.body.completed || false,
        owner: req.user._id
      });
      res.status(201).json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /api/v1/tasks
router.get('/', async (req, res) => {
  try {
    const query =
      req.user.role === 'admin'
        ? {}
        : { owner: req.user._id };

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (
      req.user.role !== 'admin' &&
      task.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/v1/tasks/:id
router.put(
  '/:id',
  [body('title').optional().notEmpty().withMessage('Title cannot be empty')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await Task.findById(req.params.id);

      if (!task) return res.status(404).json({ message: 'Task not found' });

      if (
        req.user.role !== 'admin' &&
        task.owner.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      task.title = req.body.title ?? task.title;
      task.description = req.body.description ?? task.description;
      if (typeof req.body.completed === 'boolean') {
        task.completed = req.body.completed;
      }

      await task.save();
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// DELETE /api/v1/tasks/:id
router.delete('/:id', authorize('admin', 'user'), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (
      req.user.role !== 'admin' &&
      task.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;