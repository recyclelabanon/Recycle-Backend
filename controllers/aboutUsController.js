const AboutUs = require("../models/AboutUs");
const { uploadToCloudinary } = require("../utils/cloudinary");

// ✅ GET - Fetch AboutUs data
exports.getAboutUs = async (req, res) => {
  try {
    const about = await AboutUs.findOne();
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch", error });
  }
};

// ✅ PUT - Update AboutUs data
exports.updateAboutUs = async (req, res) => {
  try {
    const formData = req.body;

    const hero =
      typeof formData.hero === "string"
        ? JSON.parse(formData.hero)
        : formData.hero || {};

    const sections =
      typeof formData.sections === "string"
        ? JSON.parse(formData.sections)
        : formData.sections || [];

    const impactPrograms =
      typeof formData.impactPrograms === "string"
        ? JSON.parse(formData.impactPrograms)
        : formData.impactPrograms || [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (!file || !file.fieldname || !file.path) continue;
        const uploaded = await uploadToCloudinary(file.path);

        if (file.fieldname === "heroBackground") {
          hero.background = uploaded;
        }

        if (file.fieldname.startsWith("sectionImage_")) {
          const key = file.fieldname.split("sectionImage_")[1];
          const sectionIndex = sections.findIndex((s) => s.key === key);
          if (sectionIndex !== -1) {
            sections[sectionIndex].image = uploaded;
          }
        }

        if (file.fieldname.startsWith("programLogo_")) {
          const key = file.fieldname.split("programLogo_")[1];
          const progIndex = impactPrograms.findIndex((p) => p.key === key);
          if (progIndex !== -1) {
            impactPrograms[progIndex].logo = uploaded;
          }
        }
      }
    }

    const updated = await AboutUs.findOneAndUpdate(
      {},
      {
        hero,
        impactStatementHtml: formData.impactStatementHtml || "",
        sections,
        impactPrograms,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Update failed", error });
  }
};
