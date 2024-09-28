import express from 'express';
import { logInController } from '../controller/logInController.js';
import { loginAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login',loginAuth, logInController)

export default router;

