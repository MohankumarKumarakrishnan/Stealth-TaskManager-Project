const Task = require('../models/Task');


module.exports.createNewTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
   console.log(req.body)
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      userId: req.user._id, 
    });
    console.log(newTask)
    await newTask.save();
    res.status(201).json({ msg: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error while creating task' });
  }
};


module.exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
   console.log(req.body)
    const task = await Task.findOne({ _id: id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found or unauthorized' });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;

    await task.save();
    res.status(200).json({ msg: 'Task updated successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error while updating task' });
  }
};


module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found or unauthorized' });
    }

    res.status(200).json({ msg: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error while deleting task' });
  }
};


module.exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error while fetching tasks' });
  }
};
