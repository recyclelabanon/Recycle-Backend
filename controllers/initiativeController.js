const InitiativePage = require('../models/InitiativePage');
const mongoose = require('mongoose');

exports.getPage = async (req, res) => {
  // If none exists, create a default doc so frontend always gets something
  let page = await InitiativePage.findOne();
  if (!page) {
    page = await InitiativePage.create({});
  }
  res.json(page);
};

exports.updatePageSettings = async (req, res) => {
  const { pageTitle, pageSubtitle, backgroundImage } = req.body;
  let page = await InitiativePage.findOne();
  if (!page) page = await InitiativePage.create({});
  page.pageTitle = pageTitle ?? page.pageTitle;
  page.pageSubtitle = pageSubtitle ?? page.pageSubtitle;
  page.backgroundImage = backgroundImage ?? page.backgroundImage;
  await page.save();
  res.json(page);
};

// Programs CRUD (subdocuments)
exports.addProgram = async (req, res) => {
  const payload = req.body;
  let page = await InitiativePage.findOne();
  if (!page) page = await InitiativePage.create({});
  page.programs.push(payload);
  await page.save();
  res.status(201).json(page);
};

exports.updateProgram = async (req, res) => {
  const { programId } = req.params;
  const payload = req.body;
  let page = await InitiativePage.findOne();
  if (!page) return res.status(404).json({ message: 'Page not found' });

  const prog = page.programs.id(programId);
  if (!prog) return res.status(404).json({ message: 'Program not found' });

  Object.assign(prog, payload);
  await page.save();
  res.json(page);
};

exports.deleteProgram = async (req, res) => {
  const { programId } = req.params;
  let page = await InitiativePage.findOne();
  if (!page) return res.status(404).json({ message: 'Page not found' });

  page.programs.id(programId).remove();
  await page.save();
  res.json(page);
};
