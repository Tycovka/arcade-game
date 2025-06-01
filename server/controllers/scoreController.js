const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/scores.json");

function getScores(req, res) {
  const raw = fs.readFileSync(dataPath);
  const scores = JSON.parse(raw);
  res.json(scores);
}

function postScore(req, res) {
  const { name, points } = req.body;
  if (!name || typeof points !== "number") {
    return res.status(400).json({ error: "Invalid data" });
  }

  const raw = fs.readFileSync(dataPath);
  const scores = JSON.parse(raw);

  scores.push({ name, points, date: new Date().toISOString() });
  scores.sort((a, b) => b.points - a.points);
  const topScores = scores.slice(0, 10);

  fs.writeFileSync(dataPath, JSON.stringify(topScores, null, 2));

  res.status(201).json({ success: true });
}

module.exports = { getScores, postScore };