const express = require("express");
const {
  getAllPartners,
  addPartner,
  updatePartner,
  deletePartner,
  reorderPartners,
} = require("../controllers/ourNetworkPartnerController");

const router = express.Router();

router.get("/", getAllPartners);
router.post("/", addPartner);
router.put("/:id", updatePartner);
router.delete("/:id", deletePartner);
router.put("/reorder", reorderPartners);

module.exports = router;
