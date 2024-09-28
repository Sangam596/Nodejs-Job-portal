import express from 'express';
import { testController } from '../controller/testController.js';
const router = express.Router();

router.post('/test', testController);

export default router;