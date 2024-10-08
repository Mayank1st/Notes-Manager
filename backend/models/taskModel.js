import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true, default: "No description" },
  priority: {
    type: String,
    required: true,
    default: "low",
    enum: ["low", "medium", "high"],
  },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
});

const TaskModel = model("tasks", taskSchema);

export default TaskModel;
