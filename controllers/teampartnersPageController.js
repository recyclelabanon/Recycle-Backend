const TeampartnersPage = require("../models/TeampartnersPageModel");
const cloudinary = require("cloudinary").v2;

// Upload buffer → Cloudinary Helper
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    );
    upload.end(buffer);
  });
};

// ================== GET ==================
const getTeampartnersPage = async (req, res) => {
  try {
    const data = await TeampartnersPage.findOne();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================== UPDATE ==================
const updateTeampartnersPage = async (req, res) => {
  try {
    let payload = JSON.parse(req.body.data);

    // ---------- HERO BACKGROUND ----------
    if (req.files.heroBackground?.[0]) {
      payload.heroBackground = await uploadToCloudinary(
        req.files.heroBackground[0].buffer,
        "teampartners/hero"
      );
    }

    // ---------- PARTNER IMAGES ----------
    const partnerCategories = [
      "coalitions",
      "donors",
      "governmentPartners",
      "projectPartners"
    ];

    for (const category of partnerCategories) {
      if (req.files[category]) {
        payload[category] = await Promise.all(
          payload[category].map(async (item, index) => {
            if (req.files[category][index]) {
              const uploadedURL = await uploadToCloudinary(
                req.files[category][index].buffer,
                `teampartners/${category}`
              );
              return { ...item, img: uploadedURL };
            }
            return item;
          })
        );
      }
    }

    // ---------- UPSERT ----------
    const updated = await TeampartnersPage.findOneAndUpdate(
      {},
      { ...payload, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: updated });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getTeampartnersPage,
  updateTeampartnersPage
};
