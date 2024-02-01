import 'dotenv/config';
import nodemailer from 'nodemailer';

function generateOTP() {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
}

async function sendOTPEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        // host: 'smtp.example.com',
        service: 'hotmail',
        port: 587,
        // auth: {
        //     user: 'twila19@ethereal.email',
        //     pass: '3C9wX2SGpJjzXTwp8b',
        // },
        auth: {
            user: process.env.USER_MAILID,
            pass: process.env.MAILID_PASS,
        },
        maxConnections: 1,
    });

    const mailOptions = {
        // from: 'twila19@ethereal.email',
        from: process.env.USER_MAILID,
        to: email,
        subject: 'OTP Verification',
        html: `
            <p>Dear User,</p>
            <p>Your OTP (One Time Password) is:</p>
            <h2 style="color: #4CAF50;">${otp}</h2>
            <p>Please use this OTP to complete your verification.</p>
            <p>Best regards,</p>
            <p>Your Application Team</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export { generateOTP, sendOTPEmail };
