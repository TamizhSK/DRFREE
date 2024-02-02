const User = require('../models/User');
const doc = require('../models/DocUser');

const getAllUsers = async() => {
    try {
        const allUsers = await User.find();
        return allUsers;
    } catch (error) {
        throw error;
    }
}

const getUser = async(userID) => {
    try {
        let user = await User.findById({userID});
        if(!user){
            user = await doc.findById({userID});
            if (!user){
                throw new Error("no user found");
            } else{
                return user
            }     
        }else{
            return user
        }
    } catch (error) {
        throw error;
    }
    // const id = req.params.id;
}


// const getDoc = 

module.exports = {
    getAllUsers,
    getUser,
  };
  