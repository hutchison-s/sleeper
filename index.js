const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/player/:id", async (req, res) => {
  const { id } = req.params();
  fs.readFile("./filteredPlayers.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(400).send({ message: "Error retrieving data" });
    }
    try {
      const players = JSON.parse(data);
      const target = players.find((x) => x.id == id);
      res.send(target);
    } catch (err) {
      console.err(err);
      return res.status(400).send({ message: "error reading player data" });
    }
  });
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
