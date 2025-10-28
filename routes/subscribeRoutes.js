import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// POST /api/subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = await Subscriber.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already subscribed" });

    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: "Subscription successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/subscribers  (admin)
router.get("/subscribers", async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/subscribers/:id  (admin)
router.delete("/subscribers/:id", async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
