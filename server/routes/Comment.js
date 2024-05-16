const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { Validate } = require("../middleware/Auth"); // Change Auth to Validate

// Get comments by post id
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comments.findAll({
      where: {
        PostId: postId,
      },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete comments by post id
router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedComments = await Comments.destroy({
      where: {
        PostId: postId,
      },
    });
    res.json(deletedComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new comment
router.post("/", Validate, async (req, res) => {
  try {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
