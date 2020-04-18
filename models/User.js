const bcrypt = require("bcryptjs");
const usersCollection = require("../db").collection("users");

let validator = require("validator");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.password = "";
  }
  //For bogus Properties

  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};

User.prototype.validate = function () {
  if (this.data.username == "") {
    this.errors.push("You Should insert username");
  }
  if (
    this.data.username != "" &&
    !validator.isAlphanumeric(this.data.username)
  ) {
    this.errors.push("You can use Number and characters");
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You Should insert email");
  }
  if (this.data.password == "") {
    this.errors.push("You Should insert password");
  }
  if (this.data.password.lenght > 0 && this.data.password.lenght < 12) {
    this.errors.push(
      "Password must be at least 3 Characters and maximum 12 characters."
    );
    if (this.data.password.lenght > 50) {
      this.data.errors.push("Password In over qualified 50 Characters!!!");
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

//Login Part
User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    usersCollection
      .findOne({ username: this.data.username })
      .then((attemptedUser) => {
        //a= not password hash in bcrypt.compareSynd = this.data.password
        //b = Hash value in database
        if (
          attemptedUser &&
          bcrypt.compareSync(this.data.password, attemptedUser.password)
        ) {
          resolve("congerats...");
        } else {
          reject("You are Fucked");
        }
      })
      .catch(function () {
        reject("Please try Again.");
      });
  });
};

User.prototype.register = function () {
  //Step #1: Validate ifUser data
  this.cleanUp();
  this.validate();

  if (!this.errors.lenght) {
    //hash user password
    let salt = bcrypt.genSaltSync(10);
    this.data.password = bcrypt.hashSync(this.data.password, salt);

    usersCollection.insertOne(this.data);
  }
};
module.exports = User;
