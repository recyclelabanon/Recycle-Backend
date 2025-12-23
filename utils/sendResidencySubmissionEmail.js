const transporter = require("./transporter");

module.exports = async (app) => {
  await transporter.sendMail({
    to: "connect@terrapods.org",
    subject: `New Residency Application – ${app.residencyTitle}`,
    html: `<p>${app.fullName} applied for residency.</p>`
  });
};
