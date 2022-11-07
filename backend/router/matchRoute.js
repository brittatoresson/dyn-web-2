const express = require("express");
const routes = express.Router();
const dB = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//GET all matches
routes.route("/matches").get(function (req, res) {
  dB.getDb("matchDb")
    .collection("matchDb")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
//GET match from ID
routes.route("/matches/:id").get(function (req, res) {
  console.log(req.params);
  let _id = req.params.id;
  console.log(_id);
  dB.getDb("matchDb")
    .collection("matchDb")
    .findOne({ _id: ObjectId(_id) }, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//GET match winners
routes.route("/matchWinners/:id").get(function (req, res) {
  let defeats = [];
  let _id = req.params.id;
  dB.getDb("matchDb")
    .collection("matchDb")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      result.map((i) => {
        if (_id == i.winner._id) {
          defeats.push(i.loser);
        }
      });
      if (defeats.length >= 1) {
        res.json(defeats);
        return;
      } else {
        // res.json({ status: "no defeats" });
        res.json({ status: 404 });
      }
    });
});

//GET match losers OKLART OM DENNA BEHÖVS
routes.route("/matchLosers/:id").get(function (req, res) {
  let loser = [];
  let _id = req.params.id;
  dB.getDb("matchDb")
    .collection("matchDb")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      result.map((i) => {
        if (_id == i.loser._id) {
          loser.push(i.winner);
          res.json(loser);
          return;
        } else {
          res.json(400);
        }
      });
    });
});

//POST new match object
routes.route("/matches").post(function (req, res) {
  let newMatch = {
    winner: req.body.winner,
    loser: req.body.loser,
  };
  dB.getDb("matchDb")
    .collection("matchDb")
    .insertOne(newMatch, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//PUT wins and defeats
routes.route("/matches").put(function (req, res) {
  let winner_id = req.body.winner;
  let loser_id = req.body.loser;
  console.log(req.body);
  dB.getDb("top50")
    .collection("top50")
    .updateOne({ _id: ObjectId(winner_id) }, { $inc: { wins: 1, games: 1 } });
  dB.getDb("top50")
    .collection("top50")
    .updateOne({ _id: ObjectId(loser_id) }, { $inc: { defeats: 1, games: 1 } });
  res.json(200);
});

//DELETE match from ID
routes.route("/matches/:id").delete(function (req, res) {
  let _id = req.params.id;
  let winner_id = req.body.item.winner._id;
  let loser_id = req.body.item.loser._id;

  dB.getDb("matchDb")
    .collection("matchDb")
    .deleteOne({ _id: ObjectId(_id) }, function (err, result) {});
  dB.getDb("top50")
    .collection("top50")
    .updateOne(
      { _id: ObjectId(winner_id) },
      { $inc: { defeats: -1, games: -1, wins: -1 } }
    );
  dB.getDb("top50")
    .collection("top50")
    .updateOne(
      { _id: ObjectId(loser_id) },
      { $inc: { defeats: -1, games: -1, wins: -1 } }
    );
  res.json(200);
});

// GET top 5 winners
routes.route("/winners").get(async function (req, response) {
  let db_connect = dB.getDb();
  let top5Win;
  db_connect
    .collection("top50")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      result.sort((a, b) => b.wins - a.wins);
      top5Win = result.slice(0, 5);
      response.json(top5Win);
    });
});
// GET top 5 losers
routes.route("/losers").get(async function (req, response) {
  let db_connect = dB.getDb();
  let top5WinDefeats;
  db_connect
    .collection("top50")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      result.sort((a, b) => b.defeats - a.defeats);
      top5WinDefeats = result.slice(0, 5);
      response.json(top5WinDefeats);
    });
});
// GET top 5 losers -  returnerar en array med id för de hamstrar som spelat mest antal matcher.
routes.route("/manyMatches").get(async function (req, response) {
  let db_connect = dB.getDb();
  let manyGames = [];
  db_connect
    .collection("top50")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      result.sort((a, b) => a.games - b.games);
      manyGames = result.slice(0, 5);
      response.json(manyGames);
    });
});
// GET  returnerar en array med id för de hamstrar som spelat flest antal matcher.
routes.route("/fewMatches").get(async function (req, response) {
  let db_connect = dB.getDb();
  let fewGames = [];
  db_connect
    .collection("top50")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      result.sort((a, b) => b.games - a.games);
      fewGames = result.slice(0, 5);
      response.json(fewGames);
    });
});

// PUT REST GAMES!!!
// routes.route("/updatematches").put(function (req, res) {
//   let winner_id = req.body.winner;
//   let loser_id = req.body.loser;
//   console.log("hej");
//   dB.getDb("top50")
//     .collection("top50")
//     // .updateMany({}, { $set: { album: "sampleText" } });
//     .updateMany({}, { $set: { wins: 0, games: 0, defeats: 0 } });
//   res.json(200);
// });

// async function test() {
//   const response = await fetch("http://localhost:2000/updatematches", {
//     method: "PUT",
//     body: JSON.stringify({ hej: "hej" }),
//     headers: { "Content-Type": "application/json" },
//   });
// }

// useEffect(() => {
//   test();
// });

module.exports = routes;
