import express from 'express';
const router = express.Router();
import { createReport, deleteReport, getReports } from '../controllers/reports.js';


router.post("/", createReport);
router.delete("/:id", deleteReport);
router.get("/", getReports);


export default router;