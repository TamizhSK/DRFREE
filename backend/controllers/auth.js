const jwt =require( 'jsonwebtoken');
const bcrypt =require ("bcryptjs");
const dotenv = require('dotenv');
dotenv.config();
const User =require( '../models/User.js');
const doc = require( '../models/DocUser.js');
const community = require( '../models/Community.js');

const Login = async(req, res) => {
    try{
   console.log('login auth');
   console.log(req.body);
   const { email, password } = req.body;
       let user = 'user';
       let existinguser = await User.findOne({ email });
       if(!existinguser){
           let existingdoc = await doc.findOne({ email });
           if(!existingdoc){
            let existingcom = await community.findOne({ email });
            if(!existingcom){
               return res.status(400).json({ message: "Invalid Credentials" });
            }
            else{
               existinguser = existingcom;
               user = 'com';
           }
        }
           else{
            existinguser = existingdoc;
            user = 'doc';
           }
       }
       console.log('auth-login', existinguser, user)
       const isPassword = await bcrypt.compare(password, existinguser.password)
       console.log('isPassword: ', isPassword);
       if(!isPassword){
           return res.status(400).json({ message: "Invalid Credentials" });
       }
       const token = jwt.sign({email: existinguser.email, id: existinguser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
       console.log('token',token);
       res.status(200).json({ result: existinguser, token, usertype: user});
   } catch(error){
       console.log("0 auth-error",error)
       res.status(500).json("Something went wrong...")
   }
}
 const UserSignUp = async(req, res) => {
    const { username, fullname,email, password,parentname,parentEmail} = req.body;
    console.log(req.body);
    try{
        const existinguser = await User.findOne({ email });
        if(existinguser){
            console.log(existinguser)
            return res.status(404).json({ message: "User already Exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({ username, fullname, email, password: hashedPassword, parentname, parentEmail })
        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        console.log('auth-signup', newUser)
        res.status(200).json({ result: newUser, token, usertype: 'user'});
    } catch(error){
        console.log(error)
        res.status(500).json("Something went wrong...")
    }
}

const DocSignUp = async(req, res) => {
    console.log(req.body);
    const { username, fullname, email, password, licence } = req.body;
    try{
        const existinguser = await doc.findOne({ email });
        if(existinguser){
            console.log(existinguser)
            return res.status(404).json({ message: "User already Exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await doc.create({ username, fullname, email, password: hashedPassword,licence })
        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        console.log('DocAuth-signup', newUser)
        res.status(200).json({ result: newUser, token, usertype: 'doc'});
    } catch(error){
        console.log(error)
        res.status(500).json("Something went wrong...")
    }
}


const ComSignUp = async(req, res) => {
    console.log(req.body);
    const { communityname, email, password, licence } = req.body;
    try{
        const existinguser = await community.findOne({ email });
        if(existinguser){
            console.log(existinguser)
            return res.status(404).json({ message: "User already Exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await community.create({ username: communityname, email, password: hashedPassword,licence })
        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        console.log('DocAuth-signup', newUser)
        res.status(200).json({ result: newUser, token, usertype: 'com' });
    } catch(error){
        console.log(error)
        res.status(500).json("Something went wrong...")
    }
}



 

module.exports = {Login, UserSignUp, DocSignUp,ComSignUp};