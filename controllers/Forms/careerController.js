// controllers/Forms/careerController.js
const { Career } = require('../../models/Form');
const { BadRequestError } = require('../../utils/errors');
const { cloudinary } = require('../../config/cloudinary');
const path = require('path');

const createCareer = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new BadRequestError('Resume file is required');
    }
    const resumeUrl = req.file.path;
    const { fullName, email, position, coverLetter } = req.body;

    const career = await Career.create({
      fullName,
      email,
      position,
      resumePath: resumeUrl,
      coverLetter,
    });

    res.status(201).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

const getAllCareer = async (req, res, next) => {
  try {
    const careers = await Career.find().sort('-createdAt');
    res.status(200).json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    next(error);
  }
};

const deleteCareerForm = async (req, res, next) => {
    try {
      const career = await Career.findById(req.params.id);
      if (!career) {
        return res.status(404).json({ success: false, message: 'Application not found' });
      }
  
      // Extract public ID from URL
      const publicId = getPublicIdFromUrl(career.resumePath);
  
      // Determine resource type based on file extension
      const ext = path.extname(career.resumePath).slice(1).toLowerCase();
      let resourceType = 'raw';
      if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) resourceType = 'image';
      else if (['mp4', 'mov'].includes(ext)) resourceType = 'video';
  
      // Destroy file on Cloudinary with correct resource_type
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  
      // Delete the document
      await career.deleteOne();
  
      res.status(200).json({ success: true, message: 'Application deleted' });
    } catch (error) {
      next(error);
    }
  };
  
  // Helper to extract Cloudinary public ID from URL
  function getPublicIdFromUrl(url) {
    const parts = url.split('/');
    const folderIndex = parts.findIndex(p => p === 'event-manager');
    const fileName = parts.pop();
    const [publicId] = fileName.split('.');
    return `event-manager/${publicId}`;
  }

module.exports = {
  createCareer,
  getAllCareer,
  deleteCareerForm,
};