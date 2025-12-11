const AboutUs = require("../models/AboutUs");
const { uploadToCloudinary } = require("../utils/cloudinary");

// ✅ GET
exports.getAboutUs = async (req, res) => {
  try {
    const about = await AboutUs.findOne();
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

// ✅ CREATE or UPDATE
exports.updateAboutUs = async (req, res) => {
  try {
    const { body, files } = req;

    const hero =
      typeof body.hero === "string" ? JSON.parse(body.hero) : body.hero || {};

    const sections =
      typeof body.sections === "string"
        ? JSON.parse(body.sections)
        : body.sections || [];

    const impactPrograms =
      typeof body.impactPrograms === "string"
        ? JSON.parse(body.impactPrograms)
        : body.impactPrograms || [];

    // ✅ Upload images
    if (files && files.length > 0) {
      for (const file of files) {
        if (!file.buffer) continue;

        const imageUrl = await uploadToCloudinary(file.buffer, "aboutus");

        // hero image
        if (file.fieldname === "heroBackground") {
          hero.background = { url: imageUrl };
        }

        // section image
        if (file.fieldname.startsWith("sectionImage_")) {
          const key = file.fieldname.replace("sectionImage_", "");
          const index = sections.findIndex((s) => s.key === key);
          if (index !== -1) {
            sections[index].image = { url: imageUrl };
          }
        }

        // program logos
        if (file.fieldname.startsWith("programLogo_")) {
          const key = file.fieldname.replace("programLogo_", "");
          const pIndex = impactPrograms.findIndex((p) => p.key === key);
          if (pIndex !== -1) {
            impactPrograms[pIndex].logo = { url: imageUrl };
          }
        }
      }
    }

    const updated = await AboutUs.findOneAndUpdate(
      {},
      {
        hero,
        sections,
        impactStatementHtml: body.impactStatementHtml || "",
        impactPrograms,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};
