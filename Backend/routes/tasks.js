const express = require("express")
const router = express.Router();
const Task = require("../Models/Task")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middlewares/fetchuser")

// Fetching all  tasks
router.get("/fetchalltasks", fetchuser, async (req, res) => {
    const task = await Task.find({ user: req.user.id })
    res.json(task);
})

// Add a new Task 
router.post("/addtask", fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 5 })

], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let task = await Task.findOne({ title: req.body.title })
        if (task) {
            return res.status(400).json({ error: "Sorry a task with this title already exists" });
        }
        task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })

        res.json({ task });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
}
)

// Update an existing task
router.put("/updatetask/:id", fetchuser, async (req, res) => {
    let { title, description, tag } = req.body;
    try {

        // Create a new task object
        const newTask = {};
        if (title) { newTask.title = title }
        if (description) { newTask.description = description }
        if (tag) { newTask.tag = tag }

        // Find the task to be updated and update it
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(400).send("Task not found");
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(400).send("Not allowed: User not authenticated");
        }

        task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
        res.json({ task })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// Delete a Task
router.delete("/deletetask/:id", fetchuser, async (req, res) => {
    try {

        // Find the task to be deleted and delete it
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(400).send("Task not found");
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(400).send("Not allowed: User not authenticated");
        }

        task = await Task.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Task has been deleted successfully", task: task })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})




module.exports = router