const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/player/:id", async (req, res) => {
  const { id } = req.params;
  fs.readFile("./filteredPlayers.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(400).send({ message: "Error retrieving data" });
    }
    try {
      const players = JSON.parse(data);
      console.log(players[0]);
      const target = players.filter((x) => x.id == id);
      if (target.length == 0) return res.send({});

      console.log(id, target[0]);
      res.send(target[0]);
    } catch (err) {
      console.err(err);
      return res.status(400).send({ message: "error reading player data" });
    }
  });
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
