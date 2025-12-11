require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// ✅ DB
const connectDB = require('./config/db');

// ✅ Routes imports
const authenticateUser = require("./middleware/auth");
const authRoutes = require('./routes/authRoutes');

const eventRoutes = require('./routes/eventRoutes');

const mediaRoutes = require('./routes/mediaRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsRoutes = require('./routes/newsRoutes');
const teamRoutes = require('./routes/teamRoutes');
//const contactRoutes = require('./routes/Forms/contactRoutes');
const careerRoutes = require('./routes/Forms/careerRoutes');
const volunteerRoutes = require('./routes/Forms/volunteerRoutes');
const donationRoutes = require('./routes/Forms/donationRoutes');
//const subscribeRoutes = require('./routes/Forms/subscribeRoutes');
 //const partnerRoutes = require('./routes/Forms/partnerRoutes');

const partnersHeroRoutes = require("./routes/partnersHeroRoutes");
const ourNetworkPartnerRoutes = require("./routes/ourNetworkPartnerRoutes");
const eventHeroRoutes = require("./routes/eventHeroRoutes");
const homeHeroRoutes = require("./routes/homeHeroRoutes");
const donationHeroRoutes = require("./routes/donationHeroRoutes");
const homepageWorkRoutes = require("./routes/homepageWorkRoutes");
const participateRoutes = require('./routes/homepageParticipate.routes');
const hireUsRoutes = require('./routes/hireUs.routes');
const quoteRoutes = require("./routes/quoteRoutes");
const errorHandler = require('./middleware/errorHandler');
const newsletterRoutes = require("./routes/newsletterRoutes");
const footerRoutes = require("./routes/footerRoutes");
const aboutUsRoutes = require("./routes/aboutUsRoutes");
//const partnerRoutes = require("./routes/partnerRoutes");
//const contactRoutes = require("./routes/contactRoutes");
const programmeRoutes = require("./routes/programmeRoutes");
const messageRoutes = require("./routes/messageRoutes");
const contactRoutes = require('./routes/contactRoutes');
const donationpageHeroRoutes = require('./routes/donationpageHero');
const contactHeroRoutes = require('./routes/contactHeroRoutes');
//const initiativesRoutes = require('./routes/initiatives');
const uploadRoutes = require('./routes/upload');
const currentEventRoutes = require("./routes/currentEventRoutes");
const upcomingEventRoutes = require("./routes/upcomingEventRoutes");
const pastEventRoutes = require("./routes/pastEventRoutes");
const eventPageHeroRoutes = require("./routes/eventPageHero");
const newsPageRoutes = require("./routes/newsPageRoutes"); 
//const blogRoutes = require("./routes/blogPageRoutes");
const blogsPageHeroRoutes = require("./routes/blogsPageHeroRoutes");
const teampartnersPageRoutes = require("./routes/teampartnersPageRoutes"); 
//const teamPageRoutes = require("./routes/teamPageRoutes");
//const uploadRoutes = require("./routes/uploadRoutes");
const teamPageRoutes = require("./routes/teamPageRoutes");
const initiativesRoutes = require("./routes/initiativesRoutes");
const initiativesHeroRoutes = require("./routes/initiativesHeroRoutes");
const joinUsRoutes = require("./routes/joinUsRoutes");
const navbarRoutes = require("./routes/navbarRoutes");

const app = express();

// ✅ Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:4000",
  "http://127.0.0.1:4000",
  "https://superb-crostata-799b06.netlify.app",
  "https://www.recyclelebanon.org",
  "https://recyclelebanon.org"
];


// ✅ CORS FIX (Added PATCH)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS blocked: " + origin), false);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Body parser
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// ✅ Serve uploads with CORS support
app.use("/uploads", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Connect DB
connectDB();

// ✅ API Routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/events", eventRoutes);

app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/team", teamRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/career", careerRoutes);
app.use("/api/v1/volunteer", volunteerRoutes);
app.use("/api/v1/donation", donationRoutes);
//app.use("/api/v1/subscribe", subscribeRoutes);
//app.use("/api/v1/partner", partnerRoutes);
app.use("/api/v1/partners-hero", partnersHeroRoutes);
app.use("/api/v1/network-partners", ourNetworkPartnerRoutes);
app.use("/api/v1/event-hero", eventHeroRoutes);
app.use("/api/v1/home-hero", homeHeroRoutes);
app.use("/api/v1/donation-hero", donationHeroRoutes);
app.use("/api/v1/homepage-work", homepageWorkRoutes);
app.use("/api/v1/homepage/participate", participateRoutes);
app.use("/api/v1/hire-us", hireUsRoutes);
app.use("/api/v1/quote", quoteRoutes);
app.use("/api/v1/newsletter", newsletterRoutes);
app.use("/api/v1/footer", footerRoutes);
app.use("/api/v1/aboutus", aboutUsRoutes);
//app.use("/api/v1/partners", partnerRoutes);
//app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/programmes", programmeRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use('/api/v1/donation-page-hero', donationpageHeroRoutes);
app.use('/api/v1/contact-hero', contactHeroRoutes);
app.use('/api/v1/initiatives', initiativesRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use("/api/v1/current-events", currentEventRoutes);
app.use("/api/v1/upcoming-events", upcomingEventRoutes);
app.use("/api/v1/past-events", pastEventRoutes);
app.use("/api/v1/event-page-hero", eventPageHeroRoutes);
app.use("/api/v1/news-page", newsPageRoutes);
//app.use("/api/v1/blogs-page-hero",blogsPageHeroRoutes);
app.use("/api/v1/blogs-page-hero", require("./routes/blogsPageHeroRoutes"));
app.use("/api/v1/teampartners-page", require("./routes/teampartnersPageRoutes"));
app.use("/api/v1/team-page", teamPageRoutes);
//app.use("/api/v1/upload", uploadRoutes);
//app.use("/api/v1/teampage", teamPageRoutes);
app.use("/api/v1/initiatives", initiativesRoutes);
app.use("/api/v1/initiatives-hero", initiativesHeroRoutes);
app.use("/api/v1/join-us", joinUsRoutes);
app.use("/api/v1/navbar", navbarRoutes);


// ✅ Root
app.get("/", (req, res) => {
  res.send({ status: "success", message: "🌱 Recycle Lebanon API is running!" });
});

// ✅ Error Handler
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// ✅ Graceful Shutdown
process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION!", err);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully...");
  server.close(() => console.log("💥 Process terminated"));
});
