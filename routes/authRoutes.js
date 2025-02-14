
import express from 'express'
const router = express.Router();
import authController from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js';


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/search', authMiddleware, authController.searchUser);

export default router;
