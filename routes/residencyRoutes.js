const router = require("express").Router();
const ctrl = require("../controllers/residencyController");
const upload = require("../middleware/upload");

router.post("/apply", upload.array("attachments"), ctrl.apply);
router.get("/admin", ctrl.getAll);
router.patch("/admin/:id/status", ctrl.updateStatus);

module.exports = router;
