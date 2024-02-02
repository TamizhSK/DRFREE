const Post = require('../models/Post'); // Adjust the path based on your project structure

// Create a new post
const createPost = async (postData) => {
  try {
    console.log("newPost",  postData);
    const newPost = await Post.create(postData);
    newPost.save();
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Retrieve all posts
const getAllPosts = async () => {
  try {
    const posts = await Post.find(); // Assuming you want to populate the 'userID' field with user details
    return posts;
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

// Update a post by post ID
const updatePost = async (postId, updateData) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });
    return updatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Delete a post by post ID
const deletePost = async (postId) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    return deletedPost;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
};
