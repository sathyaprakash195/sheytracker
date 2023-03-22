const router = require("express").Router();
const Task = require("../models/taskModal");
const authMiddleware = require("../middlwares/authMiddleware");

// create new task
router.post("/create-task", authMiddleware, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.send({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all tasks
router.post("/get-all-tasks", authMiddleware, async (req, res) => {
  try {
    const { project } = req.body;
    const tasks = await Task.find({ project }).populate(
      "assignedBy assignedTo project"
    );
    res.send({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get task by id
router.get("/get-task-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.send({
      success: true,
      data: task,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update task
router.put("/update-task/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete task
router.delete("/delete-task/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
    });
    res.send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
