const express = require("express");
const {
  addTask,
  getAllTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

//routes
//add task
router.post("/add-task", addTask);

//edit task
router.post("/edit-task", editTask);

//delete task
router.post("/delete-task", deleteTask);

//get task
router.post("/get-task", getAllTask);

module.exports = router;
