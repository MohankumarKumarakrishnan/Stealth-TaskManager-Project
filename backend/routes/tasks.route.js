const express = require("express");
const { getAlltasks, createNewTask, updateTask, deleteTask } = require("../controllers/tasks.controller");
const router = express.Router();

router.get('/tasks/getall',getAlltasks)

router.post('/tasks/newtask',createNewTask)

router.put('/tasks/update',updateTask)

router.delete('/tasks/delete',deleteTask)

module.exports = router;