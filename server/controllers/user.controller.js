import { deleteUserById, getUsers } from '../db/queries/user.query.js';
import { handleErrors } from '../utils/helper.util.js';

const SECRET_KEY = process.env.SECRET_KEY;

async function getAllUsers(req, res) {
    await handleErrors(
        async () => {
            const users = await getUsers();
            return res.status(200).json(users);
        },
        'Internal Server Error',
    );
}

async function deleteUser(req, res) {
    await handleErrors(
        async () => {
            const { id } = req.params;

            const deletedUser = await deleteUserById(id);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.clearCookie(SECRET_KEY, {
                domain: 'localhost',
                path: '/',
            });

            return res
                .status(200)
                .json({ message: 'User deleted successfully' });
        },
        'Internal Server Error',
    );
}

export { deleteUser, getAllUsers };
