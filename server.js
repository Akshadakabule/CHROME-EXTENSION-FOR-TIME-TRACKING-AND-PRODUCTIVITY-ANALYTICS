
const productiveSites = [
  "github.com",
  "leetcode.com",
  "stackoverflow.com",
  "geeksforgeeks.org"
];

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let usageData = [];

app.post("/track", (req, res) => {
  const category = productiveSites.includes(req.body.website)
    ? "Productive"
    : "Unproductive";

  usageData.push({ ...req.body, category });
  res.json({ status: "stored" });
});


app.get("/analytics", (req, res) => {
  res.json(usageData);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
