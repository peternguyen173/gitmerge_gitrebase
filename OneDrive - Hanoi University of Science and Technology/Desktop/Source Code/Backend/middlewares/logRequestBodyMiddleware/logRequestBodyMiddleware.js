const express = require('express');
const router = express.Router();
const { getUsers, getOneUser, createUser, userLogin, updateUser, deleteUser, updateUserStatus, notificationUpdate } = require('../controllers/userController');

// Middleware để log nội dung của req.body
const logRequestBody = (req, res, next) => {
    console.log('Request Body:', req.body);
    next();
};

// Routes
router.get('/api/users', logRequestBody, getUsers);
router.get('/api/users/:id', logRequestBody, getOneUser);
router.post('/api/users/:id', logRequestBody, createUser);
router.get('/api/users/login', logRequestBody, userLogin);
router.put('/api/users/:id', logRequestBody, updateUser);
router.delete('/api/users/:id', logRequestBody, deleteUser);
router.put('/api/users/:id/updatestatus', logRequestBody, updateUserStatus);
router.put('/api/users/notifications/:id', logRequestBody, notificationUpdate);

module.exports = router;
