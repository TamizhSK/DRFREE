const mongoose = require("mongoose");

const OTPVerification = mongoose.Schema({
    email  : {type: String},
    userId: {type: String},
    otp: {type: String},
    createdAt: {type: Date},
    expiresAt: {type: Date}
})

const OTP = mongoose.model("OTPVerification", OTPVerification)
module.exports = OTP;