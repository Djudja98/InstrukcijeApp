import express from 'express';
import { createConversation, getConversation } from '../controllers/conversations.js';

const router = express.Router();

//new conversation
router.post("/", createConversation);

//get conversation
router.get("/:userId", getConversation);

export default router;