import express from 'express';
import { createRequest, getRequests, deleteRequest, updateRequest } from '../controllers/instructionRequests.js';

const router = express.Router();

router.post("/", createRequest);

router.get("/:receiverId", getRequests);

router.delete("/:id", deleteRequest);

router.patch("/:id", updateRequest);

export default router;