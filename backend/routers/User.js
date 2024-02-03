const express = require('express');
const router = express.Router();
const postController = require('../controllers/post'); // Adjust the path based on your project structure
const {getAllUsers, getUser} = require('../controllers/user');


router.get('/alluser',  getAllUsers);
router.get('/get/:userId', getUser);