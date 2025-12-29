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
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2726CC;">New Career Application</h2>
        <hr/>
        <p><b>Name:</b> ${application.fullName}</p>
        <p><b>Email:</b> ${application.email}</p>
        <p><b>Role Applied For:</b> ${application.role}</p>
        <p><b>Motivational Message:</b><br/>${application.message}</p>
        
        <h4 style="margin-top: 20px; border-bottom: 1px solid #ddd;">References</h4>
        <p><b>Reference Name:</b> ${application.referenceName || "N/A"}</p>
        <p><b>Reference Contact:</b> ${application.referenceContact || "N/A"}</p>

        <h4 style="margin-top: 20px; border-bottom: 1px solid #ddd;">Attachments</h4>
        <p>
          <a href="${process.env.BASE_URL}/${application.resumeUrl}" style="display:inline-block; background:#2726CC; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px; margin-right:10px;">
            Download CV
          </a>
          ${application.portfolioUrl ? `
          <a href="${process.env.BASE_URL}/${application.portfolioUrl}" style="display:inline-block; background:#666; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px;">
            Download Portfolio
          </a>` : ""}
        </p>
      </div>
    `,
  });
};
