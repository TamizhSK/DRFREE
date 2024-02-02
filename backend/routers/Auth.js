const express =require("express");
const jwt =require( 'jsonwebtoken');
const bcrypt =require ("bcryptjs");

const User =require( '../models/User.js');
const doc = require( '../models/DocUser.js');

const { Login, UserSignUp,DocSignUp } = require("../controllers/auth.js");


const router = express.Router();

router.post('/UserSignUp', UserSignUp);
router.post('/DocSignUp', DocSignUp);
router.post('/login', Login);

module.exports = router;