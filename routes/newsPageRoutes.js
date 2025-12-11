/*const express = require("express");
const router = express.Router();
const {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews
} = require("../controllers/newsPageController");

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "backgroundImage", maxCount: 1 }
]);


router.get("/", getNews);                    
router.get("/:slug", getNewsBySlug);         
router.post("/", uploadFields, createNews);  
router.put("/:id", uploadFields, updateNews); 
router.delete("/:id", deleteNews);           

module.exports = router;*/







const express = require("express");
const router = express.Router();
const {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews
} = require("../controllers/newsPageController");

const multer = require("multer");

// Memory storage (required for Cloudinary buffer upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ⭐ Add heroBackground field for uploading
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "backgroundImage", maxCount: 1 },
  { name: "heroBackground", maxCount: 1 }   // ⭐ NEW FIELD ADDED
]);

// Routes
router.get("/", getNews);                         // GET all news
router.get("/:slug", getNewsBySlug);              // GET single news by slug
router.post("/", uploadFields, createNews);       // CREATE news
router.put("/:id", uploadFields, updateNews);     // UPDATE news
router.delete("/:id", deleteNews);                // DELETE news

module.exports = router;
