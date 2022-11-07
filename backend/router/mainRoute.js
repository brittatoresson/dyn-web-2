const express = require("express");
const routes = express.Router();
const dB = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//GET all top 50
routes.route("/top50").get(function (req, res) {
  let db_connect = dB.getDb("hamsterWarsDb");
  // res.send("hejhopp");

  db_connect
    .collection("top50")
    .find({})
    .toArray(function (err, result) {
      // if (err) {
      //   res.json(400);
      //   throw err;
      // } else {
      //   res.json(result);
      // }
      res.json(result);
    });
});
//GET a random from top 50
routes.route("/top50/random").get(function (req, res) {
  let randomItems = [];
  let allItems = [];
  let db_connect = dB.getDb("hamsterWarsDb");
  db_connect
    .collection("top50")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      let firstRandom = result[Math.floor(Math.random() * result.length)];
      allItems = result;
      randomItems.push(firstRandom);
      allItems = allItems.filter((item) => item._id !== firstRandom._id);
      let secondRandom = allItems[Math.floor(Math.random() * allItems.length)];
      randomItems.push(secondRandom);
      res.json([firstRandom, secondRandom]);
    });
});
//GET from ID
routes.route("/top50/:id").get(function (req, res) {
  let _id = req.params.id;
  dB.getDb("top50")
    .collection("top50")
    .find({ _id: ObjectId(_id) })
    .toArray(function (err, result) {
      if (err) {
        res.json(404);
        throw err;
      } else {
        res.json(result);
      }
    });
});

//POST new object
routes.route("/top50/").post(function (req, res) {
  let newObj = {
    name: req.body.item.name,
    artist: req.body.item.artist,
    album: req.body.item.album,
    img: req.body.item.img,
    uri: req.body.item.uri,
    wins: 0,
    defeats: 0,
    games: 0,
  };
  dB.getDb("top50")
    .collection("top50")
    .insertOne(newObj, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//PUT with ID
routes.route("/top50/:id").put(function (req, res) {
  let _id = req.params.id;
  let updateObj = {
    name: req.body.name,
    artist: req.body.artist,
    wins: 0,
    defeats: 0,
    games: 0,
  };
  dB.getDb("top50")
    .collection("top50")
    .updateOne(
      { _id: ObjectId(_id) },
      {
        $set: {
          name: updateObj.name,
          artist: updateObj.artist,
          wins: updateObj.wins,
        },
      }
    );
  res.json(200);
});

//DELETE item from DB
routes.route("/top50/:id").delete(function (req, res) {
  let _id = req.params.id;
  dB.getDb("top50")
    .collection("top50")
    .deleteOne({ _id: ObjectId(_id) }, function (err, result) {
      if (err) {
        res.json(404);
        throw err;
      } else {
        res.json(result);
      }
    });
});

module.exports = routes;
