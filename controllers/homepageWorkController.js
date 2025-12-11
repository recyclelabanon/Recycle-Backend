const HomepageWork = require("../models/homepageWorkModel");
const { uploadToCloudinary } = require("../utils/cloudinary");

exports.getHomepageWork = async (req, res) => {
  try {
    const data = await HomepageWork.findOne();
    res.status(200).json(data || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateHomepageWork = async (req, res) => {
  try {
    let { heading, paragraph, programs } = req.body;

    if (typeof programs === "string") {
      programs = JSON.parse(programs);
    }

    // ✔ 1. Upload images from req.files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const match = file.fieldname.match(/programs\[(\d+)\]\.image/);
        if (!match) continue;

        const index = parseInt(match[1]);

        // ✔ Upload to cloudinary
        const url = await uploadToCloudinary(
          file.buffer,
          "ecosouk/homepage/work"
        );

        programs[index].image = url;
      }
    }

    // ✔ 2. Update DB
    const updated = await HomepageWork.findOneAndUpdate(
      {},
      { heading, paragraph, programs },
      { new: true, upsert: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    console.error("Homepage Work Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};
