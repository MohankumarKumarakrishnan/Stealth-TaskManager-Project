const express = require("express");
const { getAllTasks, createNewTask, updateTask, deleteTask } = require("../controllers/tasks.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get('/tasks/getall',auth,getAllTasks)

router.post('/tasks/newtask',auth,createNewTask)

router.put('/tasks/update/:taskId',auth,updateTask)

router.delete('/tasks/delete/:id',auth,deleteTask)

module.exports = router;