import Employee from "../models/employeeModel.js";
import mongoose from "mongoose";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;
    if (!name || !email || !department)
      return res.status(400).json({ message: "All fields required" });

    const employee = await Employee.create({ name, email, department });
    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID" });
    const emp = await Employee.findById(id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department } = req.body;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID" });

    const emp = await Employee.findByIdAndUpdate(id, { name, email, department }, { new: true });
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID" });

    const emp = await Employee.findByIdAndDelete(id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
