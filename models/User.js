const usersCollection = require("../db").collection("users");

let validator = require("validator");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username == "";
  }
  if (typeof this.data.email != "string") {
    this.data.email == "";
  }
  if (typeof this.data.password != "string") {
    this.data.password == "";
  }
  // this.data = {
  //   username: this.data.username.trim().toLowerCase(),
  //   email: this.data.email.trim().toLowerCase(),
  //   password: this.data.password,
  // };
};
//For bogus Properties

User.prototype.validate = function () {
  if (this.data.username == "") {
    this.errors.push("You Should insert username");
  }
  if (this.data.username != "" && !isAlphanumeric(this.data.username)) {
    this.errors.push("You can use Number and characters");
  }
  if (!isEmail(this.data.email)) {
    this.errors.push("You Should insert email");
  }
  if (this.data.password == "") {
    this.errors.push("You Should insert password");
  }
  if (this.data.password.lenght > 0 && this.data.password.lenght < 12) {
    this.errors.push(
      "Password must be at least 3 Characters and maximum 12 characters."
    );
    if (this.data.password.lenght > 100) {
      this.data.errors.push("Password In over qualified 100 Characters!!!");
    }

    if (this.data.username.lenght > 0 && this.data.username.lenght < 3) {
      this.data.errors.push(
        "username must be at least 3 Characters and maximum 3  characters."
      );
    }
    if (this.data.username.lenght > 30) {
      this.data.username.errors,
        push("username In over qualified 30 Characters!!!");
    }
  }
};

User.prototype.register = function () {
  //Step #1: Validate User data
  this.cleanUp();
  this.validate();

  if (!this.errors.lenght) {
    try {
      usersCollection.insertOne(this.data);
    } catch (e) {
      print(e);
    }
  }
};
module.exports = User;
