const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getBlogNewsPages,
  getBlogNewsPageBySlug,
  createBlogNewsPage,
  updateBlogNewsPage,
  deleteBlogNewsPage,
} = require("../controllers/blogNewsPageController");

// 🔓 Public
router.get("/", getBlogNewsPages);
router.get("/:slug", getBlogNewsPageBySlug);

// 🔐 Admin
router.post("/", upload.single("coverImage"), createBlogNewsPage);
router.put("/:id", upload.single("coverImage"), updateBlogNewsPage);
router.delete("/:id", deleteBlogNewsPage);

module.exports = router;
