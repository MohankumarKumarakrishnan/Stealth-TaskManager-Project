const Task = require("../models/tasks");

module.exports.createNewTask = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { title, description, status, priority, createdAt } = req.body;
  
    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const newTask = new Task({
      title,
      description,
      status: status || "incomplete",
      priority: priority || "Medium",
      userId,
      createdAt: createdAt || new Date(),
    });

    await newTask.save();

    res.status(201).json({ msg: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ msg: "Server error while creating task" });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
  
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.userId.toString() !== userId) {
      return res.status(403).json({ msg: "Not authorized to update this task" });
    }

  
    const { title, description, status, priority } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;

    await task.save();

    res.status(200).json({ msg: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ msg: "Server error while updating task" });
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    if (task.userId.toString() !== userId) {
      return res.status(403).json({ msg: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ msg: "Server error while deleting task" });
  }
};

module.exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ msg: "Server error while fetching tasks" });
  }
};
