const express = require("express");
const router = express.Router();
const multer = require("multer");
//const cloudinary = require("../utils/cloudinary");
const { cloudinary, uploadToCloudinary } = require("../utils/cloudinary");

const Quote = require("../models/Quote");

const upload = multer({ storage: multer.memoryStorage() });

const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "quotes" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(req.file.buffer);
  });
};

// ✅ Create or Update Quote
router.post("/", upload.single("backgroundImage"), async (req, res) => {
  try {
    let imageUrl = req.body.existingImage;

    if (req.file) {
      const result = await streamUpload(req);
      imageUrl = result.secure_url;
    }

    const data = {
      quoteText: req.body.quoteText,
      author: req.body.author,
      backgroundImage: imageUrl,
    };

    let quote = await Quote.findOne();
    if (quote) {
      quote = await Quote.findByIdAndUpdate(quote._id, data, { new: true });
    } else {
      quote = await Quote.create(data);
    }

    res.json(quote);
  } catch (err) {
    console.error("📌 QUOTE ERROR →", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Quote
router.get("/", async (req, res) => {
  const quote = await Quote.findOne();
  res.json(quote);
});

module.exports = router;
