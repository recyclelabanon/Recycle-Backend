const express = require("express");
const DonationHero = require("../models/donationHeroModel");

const router = express.Router();

// ✅ Get Donation Page Hero Content
router.get("/", async (req, res) => {
  try {
    const data = await DonationHero.findOne();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Update Donation Page Hero Content (Admin)
router.put("/", async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    let data = await DonationHero.findOne();
    if (!data) {
      data = new DonationHero({ title, subtitle });
    } else {
      data.title = title;
      data.subtitle = subtitle;
    }

    await data.save();
    return res.json({ message: "Donation hero updated successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
