import express from 'express';
import { createMessage, getMessage } from '../controllers/messages.js';

const router = express.Router();

//add message
router.post("/", createMessage);

//get messages with id
router.get("/:conversationId", getMessage);

export default router;