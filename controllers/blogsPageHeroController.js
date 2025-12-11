const BlogsPageHero = require("../models/BlogsPageHero");
const { uploadToCloudinary } = require("../utils/cloudinary"); // use your helper

// GET hero section
exports.getHero = async (req, res) => {
  try {
    const hero = await BlogsPageHero.findOne();
    res.json(hero || {}); // send empty object if none found
  } catch (err) {
    console.error("Get Hero Error:", err);
    res.status(500).json({ message: "Failed to load hero section", error: err.message });
  }
};

// CREATE or UPDATE hero section
exports.updateHero = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    let backgroundImageUrl;

    // Only upload if file exists
    if (req.file && req.file.buffer) {
      backgroundImageUrl = await uploadToCloudinary(req.file.buffer, "blogsHero");
    }

    let hero = await BlogsPageHero.findOne();

    if (!hero) {
      // Create new hero if not exist
      hero = new BlogsPageHero({
        title: title || "",
        subtitle: subtitle || "",
        backgroundImage: backgroundImageUrl || "",
      });
    } else {
      // Update existing hero
      hero.title = title || hero.title;
      hero.subtitle = subtitle || hero.subtitle;
      hero.backgroundImage = backgroundImageUrl || hero.backgroundImage;
    }

    await hero.save();

    res.json({ message: "Hero saved successfully", hero });
  } catch (err) {
    console.error("Update Hero Error:", err);
    res.status(500).json({ message: "Save error", error: err.message });
  }
};
