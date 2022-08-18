const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// Directs to : /api/users <GET, POST>
router.route('/').get(getUsers).post(createUser);

// Directs to : /api/users/:userId <GET, PUT, DELETE>
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// Directs to : /api/users/:userId/friends/:friendId <POST, delete>
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;