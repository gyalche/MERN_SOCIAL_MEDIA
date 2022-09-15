import express from 'express';
import authMiddleWare from '../authMiddleware.js/authMiddleware.js';
import {
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  unfollowUser,
  updateUser,
} from '../Controllers/UserController.js';

const router = express.Router();

router.get('/:id', getUser);
router.put('/:id', authMiddleWare, updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, unfollowUser);
router.get('/', getAllUsers);


export default router;
