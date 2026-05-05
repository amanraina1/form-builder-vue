import express from "express";
import {
  getAllForms,
  getFormById,
  createForm,
  deleteForm,
  formSubmit,
  getFormSubmissions,
} from "../controllers/form.controller.js";

const router = express.Router();

router.get("/", getAllForms);

router.get("/:id", getFormById);

router.post("/", createForm);

router.delete("/:id", deleteForm);

router.get("/:id/submissions", getFormSubmissions);

router.post("/:id/submit", formSubmit);

export default router;
