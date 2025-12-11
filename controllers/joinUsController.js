const JoinUs = require("../models/JoinUs");

// GET - Public config
exports.getJoinUs = async (req, res) => {
  try {
    const data = await JoinUs.findOne();
    if (!data) {
      return res.json({
        hero: {
          title: "Be the change",
          description: "",
          backgroundImage: "",
        },
        theme: {
          brandColor: "#2726CC",
        },
        tabs: [
          { id: "careers", label: "Careers", enabled: true },
          { id: "volunteer", label: "Volunteer", enabled: true },
          { id: "partner", label: "Partner With Us", enabled: true },
        ],
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to load Join Us data" });
  }
};

// POST/PUT - Admin update config
exports.updateJoinUs = async (req, res) => {
  try {
    const { hero, theme, tabs } = req.body;

    let data = await JoinUs.findOne();

    if (!data) {
      data = await JoinUs.create({ hero, theme, tabs });
    } else {
      data.hero = hero || data.hero;
      data.theme = theme || data.theme;
      data.tabs = tabs || data.tabs;
      await data.save();
    }

    res.json({ message: "Join Us updated successfully", data });
  } catch (err) {
    res.status(500).json({ message: "Failed to update Join Us" });
  }
};
