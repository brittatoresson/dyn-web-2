const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });
const Db = "mongodb+srv://Britta:britta@cluster0.jy6hhtd.mongodb.net/test";

// const db =
//   process.env.ATLAS_URI ||
//   "mongodb+srv://Britta:britta@cluster0.jy6hhtd.mongodb.net/test";

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useunifiedtopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      console.log(db);
      if (db) {
        _db = db.db("hamsterWarsDb");
        console.log("Gick bra");
        return _db;
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
