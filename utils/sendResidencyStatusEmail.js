const transporter = require("./transporter");

module.exports = async (app) => {
  await transporter.sendMail({
    to: app.email,
    subject: `Residency Application ${app.status}`,
    html: `<p>Your application has been ${app.status}.</p>`
  });
};
