const Initiative = require("../models/InitiativesModel");
const { uploadToCloudinary } = require("../utils/cloudinary");

// CREATE INITIATIVE
exports.createInitiative = async (req, res) => {
  try {
    const body = { ...req.body };

    // Parse JSON fields that may come as strings
    ["offers","donations","team","partners","donors","accomplishments","callToActions"].forEach(field => {
      if (typeof body[field] === "string") {
        try { body[field] = JSON.parse(body[field]); } catch { body[field] = []; }
      }
    });

    // Generate slug if not provided
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    }

    // Upload images
    if (req.files?.image?.[0]?.buffer) {
      body.image = await uploadToCloudinary(req.files.image[0].buffer);
    }
    if (req.files?.backgroundImage?.[0]?.buffer) {
      body.backgroundImage = await uploadToCloudinary(req.files.backgroundImage[0].buffer);
    }
    if (req.files?.imageBank?.length) {
      body.imageBank = [];
      for (const img of req.files.imageBank) {
        const url = await uploadToCloudinary(img.buffer);
        body.imageBank.push(url);
      }
    }

    const doc = await Initiative.create(body);
    res.json(doc);

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Initiative.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getOne = async (req, res) => {
  try {
    const data = await Initiative.findOne({ slug: req.params.slug });
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE INITIATIVE
exports.updateInitiative = async (req, res) => {
  try {
    const body = { ...req.body };

    // Parse JSON fields
    ["offers","donations","team","partners","donors","accomplishments","callToActions"].forEach(field => {
      if (typeof body[field] === "string") {
        try { body[field] = JSON.parse(body[field]); } catch { body[field] = []; }
      }
    });

    // Upload main image
    if (req.files?.image?.[0]?.buffer) {
      body.image = await uploadToCloudinary(req.files.image[0].buffer);
    }

    // Background image
    if (req.files?.backgroundImage?.[0]?.buffer) {
      body.backgroundImage = await uploadToCloudinary(req.files.backgroundImage[0].buffer);
    }

    // Image bank
    if (req.files?.imageBank?.length) {
      body.imageBank = [];
      for (const img of req.files.imageBank) {
        const url = await uploadToCloudinary(img.buffer);
        body.imageBank.push(url);
      }
    }

    const updated = await Initiative.findOneAndUpdate(
      { slug: req.params.slug },
      body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Not found" });

    res.json(updated);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteInitiative = async (req, res) => {
  try {
    await Initiative.deleteOne({ slug: req.params.slug });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
