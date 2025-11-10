import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";

const router = express.Router();

// Protect all employee routes
router.use(authMiddleware);

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
