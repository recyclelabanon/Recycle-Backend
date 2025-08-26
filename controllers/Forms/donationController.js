const {Donation} = require("../../models/Form");
const nodemailer = require('nodemailer');

exports.createDonation = async (req, res) => {
  const { donationType, amount, name, email, message } = req.body;

  try {
    // Validate required fields
    if (!donationType || !amount || !name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Save the donation to the database
    const newDonation = new Donation({
      donationType,
      amount,
      name,
      email,
      message,
    });

    await newDonation.save();

    // Send email confirmation (optional)
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER, // Your Mailtrap username
        pass: process.env.MAILTRAP_PASS, // Your Mailtrap password
      },
    });
    
    const mailOptions = {
      from: '"Your Organization" <sunnydevbgs3@gmail.com>', // Use a valid email address
      to: email,
      subject: 'Thank you for your donation!',
      text: `Dear ${name},\n\nThank you for your generous donation of $${amount}.\n\nYour message: ${message}\n\nBest regards,\nThe Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Donation received successfully, and confirmation sent.' });
  } catch (error) {
    console.error('Error processing donation:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};