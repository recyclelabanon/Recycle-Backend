const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/uploadController");
const fileUpload = require("express-fileupload");

router.use(fileUpload({ useTempFiles: true }));

router.post("/", uploadImage);

module.exports = router;
