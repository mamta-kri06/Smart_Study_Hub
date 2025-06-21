const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Academic", "Personal", "Club", "Other"],
      default: "Other",
    },
    hours: {
      type: Number,
      required: true,
      min: 0.5,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", taskSchema);
