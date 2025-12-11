// controllers/teamPageController.js
const TeamPage = require("../models/TeamPage");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

function setDeep(obj, pathKey, value) {
  const parts = pathKey
    .replace(/\]/g, "")
    .split("[")
    .map((p) => p.split("."))
    .flat()
    .filter(Boolean);

  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (p.match(/^\d+$/)) {
      const idx = Number(p);
      if (!Array.isArray(cur)) cur = (cur = []);
      if (!cur[idx]) cur[idx] = {};
      cur = cur[idx];
    } else {
      if (!cur[p]) cur[p] = {};
      cur = cur[p];
    }
  }
  cur[parts[parts.length - 1]] = value;
}

function parseBodyToObject(body) {
  const out = {};
  Object.entries(body).forEach(([k, v]) => {
    setDeep(out, k, v);
  });
  return out;
}

function filesToMap(files = []) {
  const map = {};
  files.forEach((f) => {
    map[f.fieldname] = f;
  });
  return map;
}


exports.getTeamPage = async (req, res) => {
  try {
    let page = await TeamPage.findOne({});
    if (!page) {
      page = new TeamPage({
        hero: { title: "", subtitle: "", backgroundImage: "" },
        workWithUs: [
          { title: "", text: "", buttonText: "", buttonLink: "" },
          { title: "", text: "", buttonText: "", buttonLink: "" },
        ],
        teamSections: [],
      });
      await page.save();
    }
    res.json(page);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeamPage = async (req, res) => {
  try {
    const parsed = parseBodyToObject(req.body || {});
    const filesMap = filesToMap(req.files || []);

    if (filesMap["heroBackground"]) {
      const file = filesMap["heroBackground"];
      const uploaded = await cloudinary.uploader.upload(file.path, {
        folder: "team-page",
      });
      parsed.hero = parsed.hero || {};
      parsed.hero.backgroundImage = uploaded.secure_url;
      try { fs.unlinkSync(file.path); } catch (e) {}
    } else {
      parsed.hero = parsed.hero || {};
      if (parsed["hero.backgroundImage"]) {
        parsed.hero.backgroundImage = parsed["hero.backgroundImage"];
      }
    }

    if (parsed.teamSections && Array.isArray(parsed.teamSections)) {
      for (let s = 0; s < parsed.teamSections.length; s++) {
        const section = parsed.teamSections[s] || {};
        const members = section.members || [];
        for (let m = 0; m < members.length; m++) {
          const fileField = `memberImage_${s}_${m}`;
          if (filesMap[fileField]) {
            const file = filesMap[fileField];
            const uploaded = await cloudinary.uploader.upload(file.path, {
              folder: "team-page/members",
            });
            members[m].image = uploaded.secure_url;
            try { fs.unlinkSync(file.path); } catch (e) {}
          } else {
            members[m].image = members[m].image || "";
          }
        }
      }
    }

    if (!Array.isArray(parsed.workWithUs) && parsed.workWithUs) {
      parsed.workWithUs = Object.values(parsed.workWithUs).map((v) => v);
    }

    const saveObj = {
      hero: {
        title: parsed.hero?.title || "",
        subtitle: parsed.hero?.subtitle || "",
        backgroundImage: parsed.hero?.backgroundImage || "",
      },
      workWithUs: Array.isArray(parsed.workWithUs)
        ? parsed.workWithUs.map((w) => ({
            title: w.title || "",
            text: w.text || "",
            buttonText: w.buttonText || "",
            buttonLink: w.buttonLink || "",
          }))
        : [],
      teamSections: Array.isArray(parsed.teamSections)
        ? parsed.teamSections.map((sec) => ({
            category: sec.category || "",
            members: Array.isArray(sec.members)
              ? sec.members.map((mem) => ({
                  image: mem.image || "",
                  name: mem.name || "",
                  designation: mem.designation || "",
                  description: mem.description || "",
                  linkedin: mem.linkedin || "",
                  email: mem.email || "",
                }))
              : [],
          }))
        : [],
      lastUpdated: new Date(),
    };

    let page = await TeamPage.findOne({});
    if (!page) {
      page = new TeamPage(saveObj);
    } else {
      page.set(saveObj);
    }
    await page.save();

    res.json({ message: "Team page updated", page });
  } catch (err) {
    console.error("updateTeamPage error:", err);
    res.status(500).json({ error: err.message });
  }
};




