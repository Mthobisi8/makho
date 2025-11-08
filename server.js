const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const getDb = require("./db/db");
const { create } = require("./db/create");
const { auth } = require("./routes/auth.routes");
const { users } = require("./routes/users.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files FIRST
app.use(express.static(path.join(__dirname, "dist")));

// Your Api
app.use("/db", create);
app.use("/api/auth", auth);
app.use("/api/users", users);
// Sitemap route
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = "https://makhomconstruction.co.za/";
  const page = {
    url: "/",
    lastmod: "2024-03-14",
    changefreq: "weekly",
    priority: "1.0",
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      </urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});
// LAST: Wildcard for React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  getDb();
  console.log(`Server started on Port ${PORT}`);
});
