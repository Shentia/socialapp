const User = require("../models/User");

//Login Part
exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      //resolve Promise
      res.send(result);
    })
    .catch(function (e) {
      //reject Promise
      res.send(e);
    });
};
exports.logout = function () {};
exports.register = function (req, res) {
  let user = new User(req.body);

  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send("Thanks for registration");
  }
};
exports.home = function (req, res) {
  res.render("home-guest");
};
