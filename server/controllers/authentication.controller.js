import { createUser, getUserByEmail } from '../db/queries/user.query.js';
import { authenticate, generateSalt } from '../utils/helper.util.js';
import { generateOTP, sendOTPEmail } from '../utils/nodemailer.util.js';

const SECRET_KEY = process.env.SECRET_KEY;

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw {
                statusCode: 400,
                message: email
                    ? 'Password required'
                    : password
                    ? 'Email required'
                    : 'Email and password required',
            };
        }

        const user = await getUserByEmail(email);
        if (!user) {
            throw { statusCode: 404, message: 'User not found' };
        }

        const expectedHashedPassword = authenticate(
            user.authentication.salt,
            password
        );

        if (expectedHashedPassword !== user.authentication.password) {
            throw { statusCode: 403, message: 'Invalid credentials' };
        }

        const salt = generateSalt();
        user.authentication.sessionToken = authenticate(
            salt,
            user._id.toString()
        );

        await user.save();

        res.cookie(SECRET_KEY, user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
        });

        return res
            .status(200)
            .json({ success: true, message: 'User logged in' });
    } catch (error) {
        console.error('Error login user', error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to login user',
        });
    }
}

async function register(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw {
                success: false,
                statusCode: 400,
                message: email
                    ? 'Password required'
                    : password
                    ? 'Email required'
                    : 'Email and password required',
            };
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            throw {
                success: false,
                statusCode: 409,
                message: 'User already exists',
            };
        }

        const salt = generateSalt();
        const hashedPassword = authenticate(salt, password);

        const user = await createUser({
            email,
            authentication: {
                salt,
                password: hashedPassword,
            },
        });

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            email: user.email,
        });
    } catch (error) {
        console.error('Error registering user', error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to register user',
        });
    }
}

async function sendOTP(req, res) {
    try {
        const { email } = req.body;
        const otp = generateOTP();

        await sendOTPEmail(email, otp);

        const user = await getUserByEmail(email);
        if (!user) {
            throw { statusCode: 404, message: 'User not found' };
        }

        user.otp = otp;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
        });
    } catch (error) {
        console.error('Error sending OTP', error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to send OTP',
        });
    }
}

async function verifyOTP(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            throw { statusCode: 404, message: 'User not found' };
        }

        if (user.otp !== otp) {
            throw { statusCode: 401, message: 'Unauthorized - OTP mismatch' };
        }

        res.status(200).json({
            success: true,
            message: 'OTP verification successful',
        });
    } catch (error) {
        console.error('Error verifying OTP', error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to verify OTP',
        });
    }
}

export { login, register, sendOTP, verifyOTP };
