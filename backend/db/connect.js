const { MongoClient } = require("mongodb");
const db = process.env.ATLAS_URI;
const client = new MongoClient(db, {
  useNewUrlParser: true,
  useunifiedtopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      //kolla så vi fick in ett bra db-objekt
      if (db) {
        _db = db.db("hamsterWarsDb");
        console.log("Gick bra");
      } else {
        return callback(err);
      }
    });
  },

  getDb: function () {
    return _db;
  },
};