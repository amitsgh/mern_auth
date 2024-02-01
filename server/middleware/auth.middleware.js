import { getUserBySessionToken } from '../db/queries/user.query.js';
import { handleErrors } from '../utils/helper.util.js';

let currentUserId;
const SECRET_KEY = process.env.SECRET_KEY;

async function isOwner(req, res, next) {
    await handleErrors(async () => {
        const { id } = req.params;
        const sessionToken = req.cookies[SECRET_KEY];

        if (!sessionToken) {
            return res.status(403).json({
                error: 'Session token not provided',
            });
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.status(403).json({
                error: 'Invalid session token',
            });
        }

        if (existingUser._id.toString() !== id) {
            return res.status(403).json({ error: `Forbidden Action` });
        }

        return next();
    }, 'Internal Server Error');
}

async function isAuthenticated(req, res, next) {
    await handleErrors(async () => {
        const sessionToken = req.cookies[SECRET_KEY];

        if (!sessionToken) {
            return res.status(403).json({
                error: 'Session token not provided',
            });
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.status(403).json({
                error: 'Invalid session token',
            });
        }

        return next();
    }, 'Internal Server Error');
}

export { isAuthenticated, isOwner };
