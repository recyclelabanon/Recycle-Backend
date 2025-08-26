const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A news article must have a title'],
      trim: true,
      maxlength: [100, 'A news title must have less than 100 characters']
    },
    content: {
      type: String,
      required: [true, 'A news article must have content']
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [200, 'A summary must have less than 200 characters']
    },
    category: {
      type: String,
      default: 'General'
    },
    coverImage: {
      type: String,
      default: 'default-news.jpg'
    },
    author: {
      type: String
    },
    tags: {
      type: [String],
      default: []
    },
    videoUrl: {
      type: String
    },
    slug: {
      type: String,
      unique: true
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create a slug before saving
newsSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;