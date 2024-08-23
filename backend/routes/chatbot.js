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



module.exports = router;
