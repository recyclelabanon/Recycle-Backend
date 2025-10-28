require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// Import database connection
const connectDB = require('./config/db');


// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsRoutes = require('./routes/newsRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const contactRoutes = require('./routes/Forms/contactRoutes');
const careerRoutes = require('./routes/Forms/careerRoutes');
const volunteerRoutes = require('./routes/Forms/volunteerRoutes');
const donationRoutes = require('./routes/Forms/donationRoutes');
const subscribeRoutes = require('./routes/Forms/subscribeRoutes');
const partnerRoutes = require('./routes/Forms/partnerRoutes');
const participateRoutes = require('./routes/participateRoutes');
const errorHandler = require('./middleware/errorHandler');
const partnersHeroRoutes = require("./routes/partnersHeroRoutes");
const ourNetworkPartnerRoutes = require("./routes/ourNetworkPartnerRoutes");
const eventHeroRoutes = require("./routes/eventHeroRoutes");
//const subscribeRoutes = require ("./routes/subscribeRoutes.js");

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect MongoDB
connectDB();

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/teams", teamsRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/career", careerRoutes);
app.use("/api/v1/volunteer", volunteerRoutes);
app.use("/api/v1/donation", donationRoutes);
app.use("/api/v1/subscribe", subscribeRoutes);
app.use("/api/v1/partner", partnerRoutes);
app.use("/api/participate", participateRoutes);
app.use("/api/partners-hero", partnersHeroRoutes);
app.use("/api/network-partners", ourNetworkPartnerRoutes);
app.use("/api/event-hero", eventHeroRoutes);

app.get("/", (req, res) => {
  res.send({ status: "success", message: "API is working!" });
});

app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥", err);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => console.log("💥 Process terminated"));
});
