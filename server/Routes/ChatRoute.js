import express from 'express';
import {
  createChat,
  findChat,
  userChats,
} from '../Controllers/ChatController.js';
const router = new express.Router();

router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);
export default router;
