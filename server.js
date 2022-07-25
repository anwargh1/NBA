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

const fetch = (function () {
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
})();

app.get("/teams/:teamName", function (req, res) {
  const teamName = req.params.teamName;
  res.send(
    players
      .filter((element) => element.teamId == teamToIDs[teamName])
      .map((element) => {
        return {
          firstName: element.firstName,
          lastName: element.lastName,
          position: element.pos,
          jersey: element.jersey,
        };
      })
  );
});

const port = 3000;

app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
