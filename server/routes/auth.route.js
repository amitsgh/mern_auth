import express from 'express';
import {
    login,
    register,
    sendOTP,
    verifyOTP,
} from '../controllers/authentication.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/session', login);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;
