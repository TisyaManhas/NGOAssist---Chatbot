const express = require('express');
const router = express.Router();
const Todo = require('../modules/TODO');



router.post('/chat', async (req, res) => {
    const newChat = new Todo({
        title: req.body.question
    });

    try {
        const savedChat = await newChat.save();
        res.json(savedChat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
