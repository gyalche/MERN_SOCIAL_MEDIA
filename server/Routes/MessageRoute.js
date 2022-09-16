import express from 'express';
import { addMessage, getMessages } from '../Controllers/MessageController.js';

const router = new express.Router();

router.post('/', addMessage);
router.get('/:chatId', getMessages);

export default router;
