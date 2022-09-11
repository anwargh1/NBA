const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios").default;

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "./node_modules")));

const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};

let players = [];

const fetchPlayers = function () {
  axios
    .get("http://data.nba.net/10s/prod/v1/2018/players.json")
    .then(function (response) {
      players = response.data.league.standard
        .filter((element) => element.isActive === true)
        .filter((element) => Object.values(teamToIDs).includes(element.teamId));
    })
    .catch(function (error) {
      console.log(error);
    });
};

fetchPlayers();

app.get("/teams/:teamName", function (req, res) {
  const teamName = req.params.teamName;
  res.send(
    players
      .filter((player) => player.teamId == teamToIDs[teamName])
      .map((player) => {
        return {
          firstName: player.firstName,
          lastName: player.lastName,
          position: player.pos,
          jersey: player.jersey,
        };
      })
  );
});

const port = 3000;

app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
