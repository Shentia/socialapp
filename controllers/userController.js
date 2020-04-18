const User = require("../models/User");

exports.login = function (req, res) {
  let user = new User(req.body);
  user.login();
  res.send("Great Login");
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
