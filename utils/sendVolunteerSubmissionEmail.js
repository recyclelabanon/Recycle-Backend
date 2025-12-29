const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = async (application) => {
  await transporter.sendMail({
    envelope: {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
    },

    from: `"TerraPods" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: application.email,

    subject: `New ${application.applicationType} application`,
    html: `
      <h3>New Application</h3>
      <p><b>Name:</b> ${application.fullName}</p>
      <p><b>Email:</b> ${application.email}</p>
      <p><b>Type:</b> ${application.applicationType}</p>
      <p><b>Categories:</b> ${(application.categories || []).join(", ")}</p>
      <p><b>Availability:</b> ${application.availabilityPeriod} / ${application.daysPerWeek}</p>
      <p><b>Motivation:</b><br/>${application.motivation}</p>
      <hr/>
      <p>
        <a href="http://localhost:5000/${application.cvUrl}" style="background:#2726CC; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">Download CV / Resume</a>
        ${application.portfolioUrl ? ` &nbsp; <a href="http://localhost:5000/${application.portfolioUrl}" style="background:#2726CC; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">Download Portfolio</a>` : ""}
      </p>
    `,
  });
};
