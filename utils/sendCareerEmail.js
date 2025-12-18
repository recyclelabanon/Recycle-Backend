const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // e.g. mail.privateemail.com
  port: Number(process.env.SMTP_PORT),  // 465 or 587
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,        // connect@terrapods.org
    pass: process.env.SMTP_PASS,
  },
});

module.exports = async (application) => {
  await transporter.sendMail({
    // 🔥 THIS IS THE MOST IMPORTANT FIX
    envelope: {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
    },

    // MUST match SMTP user
    from: `"TerraPods Careers" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: application.email,

    subject: `New Career Application – ${application.role}`,
    html: `
      <h3>New Career Application</h3>
      <p><b>Name:</b> ${application.fullName}</p>
      <p><b>Email:</b> ${application.email}</p>
      <p><b>Role:</b> ${application.role}</p>
      <p><b>Message:</b><br/>${application.message}</p>

      <p>
        <a href="${process.env.BASE_URL}/${application.resumeUrl}">
          Download CV
        </a>
      </p>
    `,
  });
};
