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

module.exports = async (app) => {
  await transporter.sendMail({
    envelope: {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
    },
    from: `"TerraPods Partners" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: app.email,
    subject: "New Partner With Us Submission",
    html: `
      <h3>New Partner Application</h3>
      <p><b>Organization:</b> ${app.organizationName}</p>
      <p><b>Partner Type:</b> ${app.partnerType}</p>
      <p><b>Contact:</b> ${app.contactPerson}</p>
      <p><b>Email:</b> ${app.email}</p>
      <p><b>Website:</b> ${app.website || "—"}</p>
      <p><b>Interests:</b> ${app.partnershipInterests.join(", ")}</p>
      <p><b>Description:</b><br/>${app.description}</p>
    `,
  });
};
