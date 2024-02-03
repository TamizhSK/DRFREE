const Event = require("../models/Event");

const createPost = async (postData) => {
  try {
    console.log("newPost", postData);
    const newPost = await Event.create(postData);
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error.message); 
    throw error;
  }
};

const getAllPosts = async () => {
  try {
    const posts = await Event.find();
    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

module.exports = {
  createPost,
  getAllPosts,
};