const BlogNewsPage = require("../models/BlogNewsPage");
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");

/**
 * GET all blogs (PUBLIC)
 * GET /api/v1/blognewspage
 */
exports.getBlogNewsPages = async (req, res) => {
  try {
    const blogs = await BlogNewsPage.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET single blog by slug (PUBLIC)
 * GET /api/v1/blognewspage/:slug
 */
exports.getBlogNewsPageBySlug = async (req, res) => {
  try {
    const blog = await BlogNewsPage.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * CREATE blog (ADMIN)
 * POST /api/v1/blognewspage
 */
exports.createBlogNewsPage = async (req, res) => {
  try {
    const { title, summary, content, slug, author } = req.body;

    let imageUrl = "";

    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blognewspage",
      });
      imageUrl = result.secure_url;
      fs.unlink(req.file.path, () => {});
    }

    const blog = await BlogNewsPage.create({
      title,
      summary,
      content,
      slug,
      author,
      coverImage: imageUrl,
    });

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * UPDATE blog (ADMIN)
 * PUT /api/v1/blognewspage/:id
 */
exports.updateBlogNewsPage = async (req, res) => {
  try {
    const { title, summary, content, slug, author } = req.body;

    const blog = await BlogNewsPage.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Update text fields
    blog.title = title ?? blog.title;
    blog.summary = summary ?? blog.summary;
    blog.content = content ?? blog.content;
    blog.slug = slug ?? blog.slug;
    blog.author = author ?? blog.author;

    // If new image uploaded
    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blognewspage",
      });
      blog.coverImage = result.secure_url;
      fs.unlink(req.file.path, () => {});
    }

    await blog.save();

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE blog (ADMIN)
 * DELETE /api/v1/blognewspage/:id
 */
exports.deleteBlogNewsPage = async (req, res) => {
  try {
    const blog = await BlogNewsPage.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await blog.deleteOne();

    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
