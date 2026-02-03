import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

// --------------------
// SAFE PORT
// --------------------
const PORT = process.env.PORT || 5000;

// --------------------
// FIX __dirname (ESM SAFE)
// --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------
// MIDDLEWARE
// --------------------
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
  })
);

// --------------------
// API ROUTES
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// --------------------
// FRONTEND STATIC (RENDER SAFE)
// --------------------
const frontendPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendPath));

// Express 5 safe fallback
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// --------------------
// START SERVER
// --------------------
server.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  await connectDB();
});
