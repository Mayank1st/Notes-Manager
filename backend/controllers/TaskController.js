import TaskModel from "../models/taskModel.js";

class TaskController {
  // Add a new task
  static AddTask = async (req, res) => {
    const { title, desc, priority, createdAt, dueDate } = req.body;
    try {
      // Validate input
      if (!title || !priority || !dueDate) {
        return res.status(401).json({ message: "All fields are required" });
      }

      const isTitleExisting = await TaskModel.findOne({ title });
      if (isTitleExisting) {
        return res.status(401).json({ message: "Title should be unique" });
      }

      // Create a new task
      const newNote = new TaskModel({
        title,
        desc,
        priority,
        createdAt,
        dueDate,
      });
      await newNote.save();

      res
        .status(200)
        .json({ message: "Note added successfully", data: newNote });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal error, please try again later" });
    }
  };

  // Get all tasks
  static getAllNotes = async (req, res) => {
    try {
      const allNotes = await TaskModel.find({});
      res
        .status(200)
        .json({ message: "Data fetched successfully", data: allNotes });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal error, please try again later" });
    }
  };

  // Get a specific task by _id
  static getSpecificNote = async (req, res) => {
    const { _id } = req.params;
    try {
      if (!_id) {
        return res.status(401).json({ message: "Task ID is required" });
      }

      const task = await TaskModel.findById(_id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res
        .status(200)
        .json({ message: "Data fetched successfully", data: task });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal error, please try again later" });
    }
  };

  // Update a specific task by _id
  static updateSpecificNote = async (req, res) => {
    const { _id } = req.params;
    const { title, desc, priority, dueDate } = req.body;
    try {
      if (!_id) {
        return res.status(401).json({ message: "Task ID is required" });
      }

      const task = await TaskModel.findByIdAndUpdate(
        _id,
        { title, desc, priority, dueDate },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res
        .status(200)
        .json({ message: "Task updated successfully", data: task });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal error, please try again later" });
    }
  };

  // Delete a specific task by _id
  static deleteSpecificNote = async (req, res) => {
    const { _id } = req.params;
    try {
      if (!_id) {
        return res.status(401).json({ message: "Task ID is required" });
      }

      const task = await TaskModel.findByIdAndDelete(_id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res
        .status(200)
        .json({ message: "Task deleted successfully", data: task });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal error, please try again later" });
    }
  };
}

export default TaskController;
