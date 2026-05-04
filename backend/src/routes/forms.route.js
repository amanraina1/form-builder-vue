import express from "express";
import {
  getAllForms,
  getFormById,
  createForm,
} from "../controllers/form.controller.js";

const router = express.Router();

router.get("/", getAllForms);

router.get("/:id", getFormById);

router.post("/", createForm);

export default router;
