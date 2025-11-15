const HomepageWork = require("../models/homepageWorkModel");

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

    // Attach uploaded images to correct program item
    if (req.files) {
      Object.keys(req.files).forEach((field) => {
        const match = field.match(/programs\[(\d+)\]\.image/);
        if (match) {
          const index = match[1];
          if (programs[index]) {
            programs[index].image = `/uploads/${req.files[field][0].filename}`;
          }
        }
      });
    }

    const updated = await HomepageWork.findOneAndUpdate(
      {},
      { heading, paragraph, programs },
      { new: true, upsert: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
