const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const cloudinary = require('cloudinary').v2;
const upload = require("../middleware/uploadMiddleware");

// Get all events grouped by type
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: 1 });
    const grouped = {
      current: events.filter(e => e.type === 'current'),
      upcoming: events.filter(e => e.type === 'upcoming'),
      past: events.filter(e => e.type === 'past'),
      featured: events.filter(e => e.isFeatured)
    };
    res.json(grouped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create/Update event (Admin)
router.post('/events', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files;
    let imageUrl = '';
    let galleryUrls = [];
    let videoUrl = '';

    // Upload to Cloudinary
    if (files.image) {
      const imageResult = await cloudinary.uploader.upload(files.image[0].path);
      imageUrl = imageResult.secure_url;
    }
    if (files.gallery) {
      for (let file of files.gallery) {
        const result = await cloudinary.uploader.upload(file.path);
        galleryUrls.push(result.secure_url);
      }
    }
    if (files.video) {
      const videoResult = await cloudinary.uploader.upload(files.video[0].path, {
        resource_type: 'video'
      });
      videoUrl = videoResult.secure_url;
    }

    const eventData = {
      ...req.body,
      image: imageUrl,
      media: { gallery: galleryUrls, video: videoUrl }
    };

    const event = await Event.create(eventData);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update event
router.put('/events/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'video', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files;
    const event = await Event.findById(req.params.id);

    if (files.image?.[0]) {
      const result = await cloudinary.uploader.upload(files.image[0].path);
      event.image = result.secure_url;
    }
    if (files.gallery) {
      event.media.gallery = [];
      for (let file of files.gallery) {
        const result = await cloudinary.uploader.upload(file.path);
        event.media.gallery.push(result.secure_url);
      }
    }
    if (files.video?.[0]) {
      const result = await cloudinary.uploader.upload(files.video[0].path, {
        resource_type: 'video'
      });
      event.media.video = result.secure_url;
    }

    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
