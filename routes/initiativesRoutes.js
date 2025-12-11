const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/initiativesController");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", ctrl.getAll);
router.get("/:slug", ctrl.getOne);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
    { name: "imageBank", maxCount: 20 }
  ]),
  ctrl.createInitiative
);

router.put(
  "/:slug",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
    { name: "imageBank", maxCount: 20 }
  ]),
  ctrl.updateInitiative
);

router.delete("/:slug", ctrl.deleteInitiative);

module.exports = router;
