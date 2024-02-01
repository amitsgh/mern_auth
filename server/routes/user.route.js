import express from 'express';
import { deleteUser, getAllUsers } from '../controllers/user.controller.js';
import { isAuthenticated, isOwner } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/users', isAuthenticated, getAllUsers);
router.delete('/user/:id', isOwner, deleteUser);

export default router;
