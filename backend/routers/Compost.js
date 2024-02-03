const express = require("express");
const router = express.Router();
const compostcontroller = require("../controllers/compost");
// Create a new post
router.post("/compost", async (req, res) => {
  try {
    // const {caption, postImage, userID} = req.body;
    console.log("post:", req.body);
    const newPost = await compostcontroller.createPost(req.body);
    console.log(newPost);
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve all posts
router.get("/compost", async (req, res) => {
  try {
      const compost = await compostcontroller.getAllPosts();
      console.log(compost);
    res.json(compost);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router