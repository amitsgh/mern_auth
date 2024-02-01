import crypto from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    console.error('Missing required environment variable: SECRET_KEY');
    process.exit(1);
}

function authenticate(salt, password) {
    return crypto
        .createHmac('sha256', [salt, password].join('/'))
        .update(SECRET_KEY)
        .digest('hex');
}

function generateSalt(length = 128) {
    return crypto.randomBytes(length).toString('base64');
}

async function handleErrors(callback, errorMessage = 'Internal Server Error') {
    try {
        return await callback();
    } catch (error) {
        console.error(`Error: ${errorMessage}`, error);
    }
}

export { authenticate, generateSalt, handleErrors };
