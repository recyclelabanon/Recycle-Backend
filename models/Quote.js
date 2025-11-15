const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  quoteText: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "",
  },
  backgroundImage: {
    type: String, // Cloudinary image URL
    required: true,
  },
});

module.exports = mongoose.model("Quote", QuoteSchema);
