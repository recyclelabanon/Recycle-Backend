const {Subscribe} = require("../../models/Form");


exports.subscribeForm = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Check for a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check for duplicate email
        const existingEmail = await Subscribe.findOne({ email }); // ✅ Fixed
        if (existingEmail) {
            return res.status(409).json({ error: "Email already exists" });
        }

        // Save the email to the database
        await Subscribe.create({ email }); // ✅ Fixed
        res.status(201).json({ message: "Thank you for joining us!" });
    } catch (error) {
        console.error("Error submitting join us form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getSubscribeEmails = async (req, res) => {
    try {
        const emails = await Subscribe.find(); // Retrieve all emails
        res.status(200).json(emails); // Send emails as JSON response
    } catch (error) {
        console.error("Error fetching join us emails:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteSubscribeEmail = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }

        const deletedEmail = await Subscribe.findByIdAndDelete(id);

        if (!deletedEmail) {
            return res.status(404).json({ error: "Email not found" });
        }

        res.status(200).json({ message: "Email deleted successfully!" });
    } catch (error) {
        console.error("Error deleting email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


