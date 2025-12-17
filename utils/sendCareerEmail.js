/*const nodemailer = require("nodemailer");

module.exports = async (app) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    to: "connect@terrapods.org",
    subject: "New Career Application",
    html: `
      <h3>New Application Received</h3>
      <p><b>Name:</b> ${app.fullName}</p>
      <p><b>Email:</b> ${app.email}</p>
      <p><b>Role:</b> ${app.role}</p>
      <p>Check admin dashboard for full details.</p>
    `,
  });
};*/






const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async (application) => {
  await transporter.sendMail({
    from: `"Careers" <${process.env.EMAIL_USER}>`,
    to: "rhmain0987@gmail.com",
    subject: `New Career Application – ${application.role}`,
    html: `
      <p><b>Name:</b> ${application.fullName}</p>
      <p><b>Email:</b> ${application.email}</p>
      <p><b>Role:</b> ${application.role}</p>
      <p><b>Message:</b> ${application.message}</p>
    `,
  });
};
