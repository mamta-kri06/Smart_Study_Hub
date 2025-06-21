const taskModel = require("../models/taskModel");
const moment = require("moment");

const getAllTask = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const tasks = await taskModel.find({
      ...(frequency != "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editTask = async (req, res) => {
  try {
    await taskModel.findOneAndUpdate(
      { _id: req.body.taskId },
      req.body.payload
    );
    res.status(200).send("Edit successful");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTask = async (req, res) => {
  try {
    const newTask = new taskModel(req.body);
    await newTask.save();
    res.status(201).send("Task created");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskModel.findOneAndDelete({ _id: req.body.taskId });
    res.status(200).send("Task deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTask, addTask, editTask, deleteTask };
