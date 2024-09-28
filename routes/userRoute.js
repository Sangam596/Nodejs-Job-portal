import express from 'express';
import { userAuth } from '../middleware/authMiddleware.js';
import { deleteUserController, getUserController, userController } from '../controller/userController.js';
const router = express.Router();

router.get('/get-users', userAuth, getUserController);
router.delete('/delete-user/:userId', userAuth, deleteUserController);

router.post('/user', userAuth, userController);

export default router;