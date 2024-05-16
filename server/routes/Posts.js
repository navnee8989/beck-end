const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll();
    res.json(postData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new post
router.post("/", async (req, res) => {
  try {
    const post = req.body;
    const newPost = await Posts.create(post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get post by ID
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const postData = await Posts.findByPk(id);
    res.json(postData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Posts.destroy({
      where: {
        id: id,
      },
    });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
