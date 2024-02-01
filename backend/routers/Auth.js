const express =require("express");

const { login, UserSignUp,DocSignUp } = require("../controllers/auth.js");


const router = express.Router();

router.post('/UserSignUp', UserSignUp)
router.post('/DocSignUp', DocSignUp)
router.post('/login', login)

module.exports = router;