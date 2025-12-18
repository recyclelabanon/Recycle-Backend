const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,           // mail.privateemail.com
  port: Number(process.env.SMTP_PORT),   // 587 or 465
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,         // connect@terrapods.org
    pass: process.env.SMTP_PASS,
  },
});

module.exports = async (application) => {
  try {
    await transporter.sendMail({
      // 🔥 THIS FIXES THE ERROR
      envelope: {
        from: process.env.SMTP_USER,
        to: [process.env.SMTP_USER],
      },

      // Headers (still required)
      from: `"TerraPods" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: process.env.SMTP_USER,

      subject: `New ${application.applicationType} application`,
      html: `
        <h3>New Application Received</h3>
        <p><b>Name:</b> ${application.fullName}</p>
        <p><b>Email:</b> ${application.email}</p>
        <p><b>Type:</b> ${application.applicationType}</p>
        <p><b>Location:</b> ${application.location || "—"}</p>
        <p><b>Availability:</b> ${application.availabilityPeriod || "—"} / ${application.daysPerWeek || "—"}</p>
        <p><b>Categories:</b> ${(application.categories || []).join(", ")}</p>
        <p><b>Motivation:</b><br/>${application.motivation || "—"}</p>
      `,
    });
  } catch (err) {
    console.error("Volunteer email error:", err.message);
    // ❗ Do NOT throw — form submission should still succeed
  }
};
