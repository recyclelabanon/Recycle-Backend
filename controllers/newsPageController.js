const NewsPage = require("../models/NewsPage");
const { v2: cloudinary } = require("cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Helper to upload buffer to Cloudinary
const uploadFromBuffer = (buffer, folder = "") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

/* ============================================================
   GET ALL NEWS
============================================================ */
const getNews = async (req, res) => {
  try {
    const { category, q } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (q) filter.title = { $regex: q, $options: "i" };

    const items = await NewsPage.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   GET NEWS BY SLUG
============================================================ */
const getNewsBySlug = async (req, res) => {
  try {
    const item = await NewsPage.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   CREATE NEWS
============================================================ */
const createNews = async (req, res) => {
  try {
    const { 
      title, slug, summary, content, date, author, category, published,
      heroTitle, heroSubtitle
    } = req.body;

    let imageUrl = "";
    let bgUrl = "";
    let heroBgUrl = "";

    // Upload image → Cloudinary
    if (req.files?.image) {
      const result = await uploadFromBuffer(
        req.files.image[0].buffer,
        "news/images"
      );
      imageUrl = result.secure_url;
    }

    // Upload page background image
    if (req.files?.backgroundImage) {
      const result2 = await uploadFromBuffer(
        req.files.backgroundImage[0].buffer,
        "news/backgrounds"
      );
      bgUrl = result2.secure_url;
    }

    // Upload hero background
    if (req.files?.heroBackground) {
      const result3 = await uploadFromBuffer(
        req.files.heroBackground[0].buffer,
        "news/hero"
      );
      heroBgUrl = result3.secure_url;
    }

    // Create document
    const news = await NewsPage.create({
      title,
      slug,
      summary,
      content,
      date: date ? new Date(date) : new Date(),
      author,
      category,
      image: imageUrl,
      backgroundImage: bgUrl,
      published: published === "true" || published === true,

      hero: {
        title: heroTitle || "Eco Newsrooms",
        subtitle: heroSubtitle || "Stay updated with our latest environmental initiatives.",
        backgroundImage: heroBgUrl
      }
    });

    res.status(201).json(news);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   UPDATE NEWS
============================================================ */
const updateNews = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.date) payload.date = new Date(payload.date);

    // Image update
    if (req.files?.image) {
      const result = await uploadFromBuffer(
        req.files.image[0].buffer,
        "news/images"
      );
      payload.image = result.secure_url;
    }

    // Background image update
    if (req.files?.backgroundImage) {
      const result2 = await uploadFromBuffer(
        req.files.backgroundImage[0].buffer,
        "news/backgrounds"
      );
      payload.backgroundImage = result2.secure_url;
    }

    // Hero bg update
    if (req.files?.heroBackground) {
      const result3 = await uploadFromBuffer(
        req.files.heroBackground[0].buffer,
        "news/hero"
      );
      payload["hero.backgroundImage"] = result3.secure_url;
    }

    // Hero text
    if (payload.heroTitle) payload["hero.title"] = payload.heroTitle;
    if (payload.heroSubtitle) payload["hero.subtitle"] = payload.heroSubtitle;

    delete payload.heroTitle;
    delete payload.heroSubtitle;

    const updated = await NewsPage.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });

    res.json(updated);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ============================================================
   DELETE NEWS
============================================================ */
const deleteNews = async (req, res) => {
  try {
    await NewsPage.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
};
