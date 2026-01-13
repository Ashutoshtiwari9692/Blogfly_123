import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Certificate handling: only attempt to read local certs in development.
const certDir = path.join(__dirname, "certs");
const keyPath = path.join(certDir, "server.key");
const certPath = path.join(certDir, "server.crt");

const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  // Development: try HTTPS with local self-signed certs if present, otherwise fallback to HTTP
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const key = fs.readFileSync(keyPath, "utf8");
    const cert = fs.readFileSync(certPath, "utf8");
    const server = https.createServer({ key, cert }, app);
    server.listen(PORT, () => {
      console.log(`Dev HTTPS server running at https://localhost:${PORT}`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`Dev HTTP server running at http://localhost:${PORT}`);
    });
  }
} else {
  // Production: platform handles TLS termination (Render/other hosts)
  app.listen(PORT, () => {
    console.log(
      `Server listening on port ${PORT} (TLS termination by platform)`
    );
  });
}
