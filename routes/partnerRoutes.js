const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
} = require("../controllers/partnerController");

// ✅ Get all partners
router.get("/", getAllPartners);

// ✅ Get single partner by ID
router.get("/:id", getPartnerById);

// ✅ Create a new partner
router.post("/", upload.single("logo"), createPartner);

// ✅ Update partner
router.put("/:id", upload.single("logo"), updatePartner);

// ✅ Delete partner
router.delete("/:id", deletePartner);

module.exports = router;
