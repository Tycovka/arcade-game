const express = require("express");
const cors = require("cors");
const scoreRoutes = require("./routes/scores");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/scores", scoreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});