import express from "express";
import TaskController from "../controllers/TaskController.js";
const router = express.Router();

// Task Routes
router.post("/add-notes", TaskController.AddTask);
router.get("/notes", TaskController.getAllNotes);
router.get("/notes/:_id", TaskController.getSpecificNote);
router.put("/notes/:_id", TaskController.updateSpecificNote);
router.delete("/notes/:_id", TaskController.deleteSpecificNote);

export default router;
