const express = require('express');
const router = express.Router();
const postController = require('../controllers/post'); // Adjust the path based on your project structure

// Create a new post
router.post('/posts', async(req, res) => {
  try {
    // const {caption, postImage, userID} = req.body;
    console.log("post:", req.body);
    const newPost = await postController.createPost(req.body);
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await postController.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a post by post ID
// router.put('/posts/:postId', async (req, res) => {
//   try {
//     const updatedPost = await postController.updatePost(req.params.postId, req.body);
//     res.json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Delete a post by post ID
router.delete('/posts/:postId', async (req, res) => {
  try {
    const deletedPost = await postController.deletePost(req.params.postId);
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
