import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import List from "../models/list.js";
import User from "../models/User.js";

// Add a new task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "You have to login first" });
    }

    const list = new List({ title, body, user: existingUser._id });
    await list.save();

    existingUser.lists.push(list._id);
    await existingUser.save();

    return res.status(200).json({ message: "Note added successfully", list });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// Update a task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "You have to login first" });
    }

    const updatedTask = await List.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task updated", list: updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// Delete a task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const existingUser = await User.findOneAndUpdate(
      { email },
      { $pull: { lists: id } }
    );

    if (!existingUser) {
      return res.status(400).json({ message: "You have to login first" });
    }

    const deletedTask = await List.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// Get all tasks for a user
router.get("/getTasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const lists = await List.find({ user: id });

    return res.status(200).json({ list: lists }); // returns empty array if none
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
