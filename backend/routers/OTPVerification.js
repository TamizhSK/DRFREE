const express = require("express");
const {
    resendOTPVerification,
    sendOTPVerification,
    verifyOTP,
    resetPassword,
    sendResetMail
  } = require("../controllers/OTPVerification.js");
// import auth from '../middlewares/auth.js';

const router = express.Router();
// console.log("router")
router.post('/sendOTPVerification',  sendOTPVerification)
router.post('/resendOTPVerification',  resendOTPVerification)
router.post('/verifyOTP',  verifyOTP)
router.post("/sendResetMail", sendResetMail)
router.post("/resetPassword", resetPassword)

module.exports = router;