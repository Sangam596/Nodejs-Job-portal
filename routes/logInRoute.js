import express from 'express';
import { logInController } from '../controller/logInController.js';
const router = express.Router();

router.post('/login', logInController)

export default router;

