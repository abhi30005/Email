import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import emailRoutes from "./routes/emailRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.json({ message: "AI Email Drafting Assistant API running" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AI Email Drafting Assistant Backend",
    time: new Date().toISOString()
  });
});

app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
