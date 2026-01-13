import express from "express";
import Post from "../models/Post.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// Create post (authenticated)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const post = new Post({
      title,
      content,
      author: req.user.id,
      authorName: req.user.username,
    });

    await post.save();
    await post.populate("author", "username");

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// Update post (authenticated)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this post" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    post.updatedAt = Date.now();

    await post.save();
    await post.populate("author", "username");

    res.json({
      message: "Post updated successfully",
      post,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// Delete post (authenticated)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

export default router;
