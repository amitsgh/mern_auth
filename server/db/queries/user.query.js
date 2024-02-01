import { handleErrors } from '../../utils/helper.util.js';
import User from '../models/user.model.js';

// GET queries

async function getUsers() {
    return await handleErrors(() => User.find(), 'Failed to fetch users');
}

async function getUserById(id) {
    return await handleErrors(
        () => User.findById(id),
        `Failed to fetch user by id ${id}`
    );
}

async function getUserByEmail(email) {
    return await handleErrors(
        () =>
            User.findOne({ email }).select(
                '+authentication.salt +authentication.password'
            ),
        'Failed to fetch user by email'
    );
}

async function getUserBySessionToken(sessionToken) {
    return await handleErrors(
        () => User.findOne({ 'authentication.sessionToken': sessionToken }),
        'Failed to fetch user by session token'
    );
}

// POST queries

async function createUser(values) {
    return await handleErrors(
        () => new User(values).save(),
        'Failed to create user'
    );
}

// DELETE queries

async function deleteUserById(id) {
    return await handleErrors(
        () => User.findOneAndDelete({ _id: id }),
        'Failed to delete user by id'
    );
}

// PATCH queries

async function updateUserById(id, values) {
    return await handleErrors(
        () => User.findOneAndUpdate({ _id: id }, values, { new: true }),
        'Failed to update user by id'
    );
}

export {
    createUser,
    deleteUserById,
    getUserByEmail,
    getUserById,
    getUserBySessionToken,
    getUsers,
    updateUserById,
};
