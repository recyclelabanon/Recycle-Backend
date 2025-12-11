const Blog = require("../models/Blog");
const { uploadToCloudinary } = require("../utils/cloudinary");

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ CREATE BLOG (FIXED)
exports.createBlog = async (req, res) => {
  try {
    const { title, summary, author, link, content } = req.body;

    if (!title || !summary || !author || !content) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    let coverImageUrl = null;

    if (req.file && req.file.buffer) {
      coverImageUrl = await uploadToCloudinary(
        req.file.buffer,
        "blogs"
      );
    }

    const blog = new Blog({
      title,
      summary,
      author,
      link,
      content,
      coverImage: coverImageUrl,
    });

    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ message: err.message });
  }
};


// ✅ UPDATE BLOG (FIXED)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, summary, author, link, content } = req.body;

    if (title) blog.title = title;
    if (summary) blog.summary = summary;
    if (author) blog.author = author;
    if (link) blog.link = link;
    if (content) blog.content = content;

    if (req.file && req.file.buffer) {
      blog.coverImage = await uploadToCloudinary(
        req.file.buffer,
        "blogs"
      );
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
