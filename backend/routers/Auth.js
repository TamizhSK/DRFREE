const express =require("express");
const jwt =require( 'jsonwebtoken');
const bcrypt =require ("bcryptjs");

const User =require( '../models/User.js');
const doc = require( '../models/DocUser.js');
const community = require( '../models/Community.js');

const { Login, UserSignUp,DocSignUp,ComSignUp } = require("../controllers/auth.js");


const router = express.Router();

router.post('/UserSignUp', UserSignUp);
router.post('/DocSignUp', DocSignUp);
router.post('/ComSignUp', ComSignUp);
router.post('/login', Login);

module.exports = router;