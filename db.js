const mongodb = require("mongodb");

const connectionString =
  "mongodb+srv://shentia:cU4WxcwfY892yvXo@cluster0-e70ib.mongodb.net/socialapp?retryWrites=true ";

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    module.exports = client.db();
    const app = require("./app");
    app.listen(3000);
  }
);
