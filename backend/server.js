const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
const Postrouter = require('./routers/Post');
const Authrouter = require('./routers/Auth');
const Userrouter = require('./routers/User');
const VerificationRouter =  require('./routers/OTPVerification.js');
const Compostrouter =  require('./routers/Compost')




const User = require("./models/User");
const Message = require("./models/message");
const doc = require('./models/DocUser');
const com = require('./models/Community');

app.use('/api/rst', VerificationRouter);
app.use('/api/post', Postrouter ); // Post routers  
app.use('/api/auth', Authrouter ); // Auth Routers
app.use('/api/comp', Compostrouter); // Auth Routers
app.get("/api/get", (req, res)=>{
    console.log("first-server")
    res.json({message: "hello world!!"});
    
});

app.get("/users/:userId", (req, res) => {
    const loggedInUserId = req.params.userId;
  
    doc.find({ _id: { $ne: loggedInUserId } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log("Error retrieving users", err);
        res.status(500).json({ message: "Error retrieving users" });
      });
  });

  app.get("/docs/:userId", (req, res) => {
    const loggedInUserId = req.params.userId;
  
    User.find({ _id: { $ne: loggedInUserId } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log("Error retrieving users", err);
        res.status(500).json({ message: "Error retrieving users" });
      });
  });

  app.get("/com/:userId", (req, res) => {
    const loggedInUserId = req.params.userId;
  
    com.find({ _id: { $ne: loggedInUserId } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log("Error retrieving users", err);
        res.status(500).json({ message: "Error retrieving users" });
      });
  });

  app.post("/friend-request", async (req, res) => {
    const { currentUserId, selectedUserId, usertype } = req.body;
  
    try {
        if(usertype==='user'){
            await doc.findByIdAndUpdate(selectedUserId, {
              $push: { freindRequests: currentUserId },
            });
            await User.findByIdAndUpdate(currentUserId, {
                $push: { sentFriendRequests: selectedUserId },
              });
        }else if(usertype==='doc'){
            await User.findByIdAndUpdate(selectedUserId, {
                $push: { freindRequests: currentUserId },
              });
            await doc.findByIdAndUpdate(currentUserId, {
            $push: { sentFriendRequests: selectedUserId },
            });
        }else{
            await com.findByIdAndUpdate(selectedUserId, {
                $push: { freindRequests: currentUserId },
              });
            await com.findByIdAndUpdate(currentUserId, {
            $push: { sentFriendRequests: selectedUserId },
            });
        }
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });


  app.get("/doc/friend-request/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      //fetch the user document based on the User id
      const user = await doc.findById(userId)
        .populate("freindRequests", "name email")
        .lean();
  
      const freindRequests = user.freindRequests;
  
      res.json(freindRequests);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/user/friend-request/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      //fetch the user document based on the User id
      const user = await User.findById(userId)
        .populate("freindRequests", "name email")
        .lean();
  
      const freindRequests = user.freindRequests;
  
      res.json(freindRequests);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/com/friend-request/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      //fetch the user document based on the User id
      const user = await User.findById(userId)
        .populate("freindRequests", "name email")
        .lean();
  
      const freindRequests = user.freindRequests;
  
      res.json(freindRequests);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  app.post("/friend-request/accept", async (req, res) => {
    try {
      const { senderId, recepientId, usertype } = req.body;
      console.log(usertype, senderId, recepientId);
      //retrieve the documents of sender and the recipient
      if(usertype==='user'){
          const sender = await doc.findById(senderId);
          const recepient = await User.findById(recepientId);
          sender.friends.push(recepientId);
      recepient.friends.push(senderId);
  
      recepient.freindRequests = recepient.freindRequests.filter(
        (request) => request.toString() !== senderId.toString()
      );
  
      sender.sentFriendRequests = sender.sentFriendRequests.filter(
        (request) => request.toString() !== recepientId.toString()
      );
      await sender.save();
      await recepient.save();
      }else{
        const sender = await User.findById(senderId);
          const recepient = await doc.findById(recepientId);
          console.log(sender);
          sender.friends.push(recepientId);
          recepient.friends.push(senderId);
      
          recepient.freindRequests = recepient.freindRequests.filter(
            (request) => request.toString() !== senderId.toString()
          );
      
          sender.sentFriendRequests = sender.sentFriendRequests.filter(
            (request) => request.toString() !== recepientId.toString()
            );
            await sender.save();
            await recepient.save();
      }
  
  
      res.status(200).json({ message: "Friend Request accepted successfully"});
    } catch (error) {
      console.log(error);
      res.status(501).json({ message: "Internal Server Error" });
    }
  });

  app.get("/user/accepted-friends/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      const acceptedFriends = user.friends;
      res.json({acceptedFriends});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/doc/accepted-friends/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      const user = await doc.findById(userId)
      console.log(user.friends)
      const acceptedFriends = user.friends;
      res.json({acceptedFriends});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.post("/messages", async (req, res) => {
    try {
      const { senderId, recepientId, messageType, messageText } = req.body;
      console.log(req.body);
      const newMessage = new Message({
        senderId,
        recepientId,
        messageType,
        message: messageText,
        timestamp: new Date(),
        imageUrl: messageType === "image" ? req.file.path : null,
      });
  
      await newMessage.save();
      res.status(200).json({ message: "Message sent Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      //fetch the user data from the user ID
      const recepientId = await User.findById(userId);
  
      res.json({recepientId});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/doc/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      //fetch the user data from the user ID
      const recepientId = await doc.findById(userId);
      // console.log(recepientId);
      res.json({recepientId});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/messages/:senderId/:recepientId/:usertype", async (req, res) => {
    try {
      const { senderId, recepientId, usertype } = req.params;
  
      const messages = await Message.find({
        $or: [
          { senderId: senderId, recepientId: recepientId },
          { senderId: recepientId, recepientId: senderId },
        ],
      });
      const recp = (usertype==='user')?await doc.findById(recepientId) : User.findById(recepientId);
      console.log('mmm', recp);
      res.json({messages});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/deleteMessages", async (req, res) => {
    try {
      const { messages } = req.body;
  
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ message: "invalid req body!" });
      }
  
      await Message.deleteMany({ _id: { $in: messages } });
  
      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server" });
    }
  });
  
  
  
  app.get("/user/friend-requests/sent/:userId",async(req,res) => {
    try{
      const {userId} = req.params;
      const user = await User.findById(userId).populate("sentFriendRequests","name email").lean();
  
      const sentFriendRequests = user.sentFriendRequests;
        
      res.json(sentFriendRequests);
    } catch(error){
      console.log("error",error);
      res.status(500).json({ error: "Internal Server" });
    }
  })
  
  app.get("/doc/friend-requests/sent/:userId",async(req,res) => {
    try{
      const {userId} = req.params;
      const user = await doc.findById(userId).populate("sentFriendRequests","name email").lean();
  
      const sentFriendRequests = user.sentFriendRequests;
  
      res.json(sentFriendRequests);
    } catch(error){
      console.log("error",error);
      res.status(500).json({ error: "Internal Server" });
    }
  })
  app.get("/user-friends/:userId",(req,res) => {
    try{
      const {userId} = req.params;
  
      User.findById(userId).populate("friends").then((user) => {
        if(!user){
          return res.status(404).json({message: "User not found"})
        }
  
        const friendIds = user.friends.map((friend) => friend._id);
  
        res.status(200).json(friendIds);
      })
    } catch(error){
      console.log("error",error);
      res.status(500).json({message:"internal server error"})
    }
  })
  app.get("/doc-friends/:userId",(req,res) => {
    try{
      const {userId} = req.params;
  
      User.findById(userId).populate("friends").then((user) => {
        if(!user){
          return res.status(404).json({message: "User not found"})
        }
  
        const friendIds = user.friends.map((friend) => friend._id);
  
        res.status(200).json(friendIds);
      })
    } catch(error){
      console.log("error",error);
      res.status(500).json({message:"internal server error"})
    }
  })


const PORT = process.env.PORT || 6969 ; 

const connection_url = process.env.CONNECTION_URL; 

mongoose.connect(connection_url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
    .catch((err) => console.log(err.message))