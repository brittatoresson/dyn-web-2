// const { MongoClient } = require("mongodb");
// let he = "mongodb+srv://cluster0.jy6hhtd.mongodb.net/myFirstDatabase";
let hej = "mongodb+srv://Britta:britta@cluster0.jy6hhtd.mongodb.net/test";
// const db = hej;
const db = process.env.ATLAS_URI;
// const client = new MongoClient(db, {
//   useNewUrlParser: true,
//   useunifiedtopology: true,
// });

// let _db;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       //kolla så vi fick in ett bra db-objekt
//       if (db) {
//         _db = db.db("hamsterWarsDb");
//         console.log("Gick bra");
//         return _db;
//       } else {
//         console.log("ingen connection");
//         return callback(err);
//       }
//     });
//   },

//   getDb: function () {
//     return _db;
//   },
// };

const MongoClient = require("mongodb").MongoClient;
let _db;

const client = new MongoClient(
  "mongodb+srv://Britta:britta@cluster0.jy6hhtd.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = {
  connectToServer: async function run() {
    try {
      let hej = await client.connect();
      if (hej) {
        _db = client.db("hamsterWarsDb");
        console.log("hej");
        return _db;
      }
    } catch {
      console.log("catch");
    }
  },
  getDb: function () {
    return _db;
  },
  // run().catch(console.dir)
};
