const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogPageController");

// Memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ------------------ Public routes ------------------
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// ------------------ Admin routes (DEV ONLY) ------------------
// No authentication/role check in development
router.post("/", upload.single("coverImage"), createBlog);
router.put("/:id", upload.single("coverImage"), updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
