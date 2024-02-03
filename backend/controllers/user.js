const User = require('../models/User');
const doc = require('../models/DocUser');
const Message = require('../models/message');

const getAllUsers = async() => {
    try {
        const allUsers = await User.find();
        return allUsers;
    } catch (error) {
        throw error;
    }
}

const getUser = async(req, res) => {
    try {
        const userID = req.params.userId;
        let user = await User.findById({userID});
        if(!user){
            user = await doc.findById({userID});
            if (!user){
                throw new Error("no user found");
            } else{
                res.status(200).json(user);
            }     
        }else{
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({message: "user not found"});
    }
    // const id = req.params.id;
}


// const getDoc = 

module.exports = {
    getAllUsers,
    getUser,
  };
  