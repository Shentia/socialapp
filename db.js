const mongodb = require("mongodb");

const connectionString = "DATABSE";

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    module.exports = client.db();
    const app = require("./app");
    app.listen(3000);
  }
);
