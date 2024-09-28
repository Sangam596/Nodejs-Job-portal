import express from "express";
import { registerController } from "../controller/registerController.js";
import { registerAuth } from "../middleware/authMiddleware.js";
 const router = express.Router();

 router.post('/register',registerAuth,registerController);

 export default router;
