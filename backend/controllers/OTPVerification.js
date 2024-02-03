const OTPVerification = require('../models/OTPVerification.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });


  transporter.verify((error, success) => {
    if(error){
        console.log(error)
    } else {
        console.log("Ready for sending emails...");
        console.log(success);
    }
  })

 const sendResetMail = async(req, res) => {
    const {email} = req.body
    console.log(email);
    if (!mongoose.Types.ObjectId.isValid(email)) {
        return res.status(404).send("user unavailable...");
      }
    // const resetLink = `http://172.16.22.25:6969/reset-password/${id}`

    try{
        const user = await User.find(email);
        console.log(user);
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: `Reset Password for DR_FREE`,
            html: `<html>
            <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
              <div
                style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
              >
                <h2 style="font-size: 24px; color: #333333; margin-bottom: 20px;">Reset Password</h2>
                <p style="font-size: 16px; color: #555555; margin-bottom: 30px;">Dear ${user.name},</p>
                <p style="font-size: 16px; color: #555555; margin-bottom: 30px;">
                  We have received a request to reset your password.
                </p>
                <p style="font-size: 16px; color: #555555;">If you did not request a password reset, please ignore this email.</p>
                <p style="font-size: 16px; color: #555555;">Thank you!</p>
                <p style="font-size: 16px; color: #555555;">Best regards,<br>TECH MARVEL</p>
              </div>
            </body>
          </html>
            `,
          };
          await transporter.sendMail(mailOptions)

          res.status(200).json({message: "Reset Mail Sent Successfully"})
    } catch(error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
}

 const resetPassword = async(req, res) => {
}

 const sendOTPVerification = async (req,res) => {
    try {
        const {email} = req.body
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify with OTP for DR FREE",
            html: `<html>
            <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <h2 style="font-size: 24px; color: #333333; margin-bottom: 20px;">DR FREE - OTP Verification</h2>
                <p style="font-size: 16px; color: #555555; margin-bottom: 30px;">Dear User,</p>
                <p style="font-size: 16px; color: #555555; margin-bottom: 30px;">Thank you for signing up for the DR FREE. To complete the verification process and gain access to the DR FREE, please use the following OTP (One-Time Password):</p>
                <div style="background-color: #f8f8f8; padding: 10px 20px; border-radius: 4px; font-size: 20px; color: #333333; display: inline-block;">${otp}</div>
                <p style="font-size: 16px; color: #555555; margin-top: 30px;">Please enter this OTP on the verification page to complete the process. If you did not request this verification, please ignore this email.</p>
                <p style="font-size: 16px; color: #555555; margin-top: 30px;">Thank you for choosing DR FREE!</p>
                <p style="font-size: 16px; color: #555555;">Best regards,<br>DR FREE Team</p>
              </div>
            </body>
          </html>
            `
            // html:`<p>Enter <b>${otp}</b> in the app to verify your identity to access Stack-OverFlow ChatBot</p>
            // <p>This code <b>expires in 10mins</b></p>`
        };

        // console.log(mailOptions)
        const saltRounds = 10;

        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const id = User.findOne(email)._id;

        const newOTPVerification = await new OTPVerification({
            email : email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000,
            userId: id,
        })

        console.log(newOTPVerification)

        console.log(transporter)
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions)


        res.json({
            status: "PENDING",
            message: "Verification otp email sent",
            data: {
                userId: id,
                email: email,
                otp_id: newOTPVerification._id,
            },
        });

    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
}

 const verifyOTP = async(req, res) => {
    try {
        console.log("Body:", req.body)
        const {otp,email,newPassword} = req.body;
        const userVerification = await OTPVerification.findOne({email});
        const id = userVerification ? userVerification._id : null;
        
        console.log("id:", id, otp)
        // const userId = id;
        if(!id || !otp) {
            throw new Error("Empty otp details are not allowed");
        }else{
            const userOTPVerification = await OTPVerification.find({
                userId: id,
            });
            const userOTPVerifications = userOTPVerification.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)
            if(userOTPVerifications.length <= 0){
                throw new Error("Account record doesn't exist or has been verified already.");
            }else{
                const {expiresAt} = userOTPVerifications[0];
                const hashedOTP = userOTPVerifications[0].otp;

                if(expiresAt < Date.now()){
                    await OTPVerification.deleteMany({userId: id});
                    throw new Error("Code has been expired. Please request again");
                }else{
                    const validOTP = await bcrypt.compare(otp, hashedOTP);

                    if(!validOTP){
                        throw new Error("Invalid Code!!!, Check your inbox");
                    } else {
                        console.log(validOTP);
                        const {email, newPassword} = req.body;
                        const user = await User.findOne({ email });
                        console.log(id);
                        if (!mongoose.Types.ObjectId.isValid(id)) {
                            return res.status(404).send("user unavailable...");
                        }
                        const hashedPassword = await bcrypt.hash(newPassword, 12)
                            // const newUser = await users.create({ name, email, password: hashedPassword })
                        const updatedProfile = await User.findByIdAndUpdate( user._id, { $set: { password: hashedPassword } }, { new: true } );
                        console.log("HI");
                        await OTPVerification.deleteMany({userId: id});
                        res.json({
                            status: 'VERIFIED',
                            message: "user otp verified Successfully",
                        });
                    }
                }
            }
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        })
    }
}

 const resendOTPVerification = async(req, res) => {
    try {
        const {id, email} = req.body;

        if(!id || !email){
            throw new Error("Empty user Details are not allowed");
        } else {
            await OTPVerification.deleteMany({id});
            sendOTPVerification(req, res);
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        })
    }
}

module.exports = {
    resetPassword,
    resendOTPVerification,
    verifyOTP,
    sendOTPVerification,
    sendResetMail
}