const userCollections = require("../db").collection("users")
const bcrypt = require("bcrypt")
const { ObjectId } = require("mongodb")
const ObjectID = require("mongodb").ObjectID

function User(data) {
  this.data = data
  this.errors = []
}
User.prototype.cleanData = function () {
  this.data = {
    username: this.data.username ? this.data.username.trim() : "",
    email: this.data.email ? this.data.email.trim() : "",
    password: this.data.password
  }
}
User.prototype.validate = function () {
  if (this.data.username == "") {
    errors.push("Enter Username")
  }
  if (this.data.email == "") {
    this.errors.push("enter valid email")
  }
  if (this.data.password == "") {
    this.errors.push("Enter password")
  }
}
User.prototype.register = function () {
  return new Promise((resolve, reject) => {
    this.cleanData()
    this.validate()
    if (!this.errors.length) {
      const salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt)
      userCollections
        .insertOne(this.data)
        .then(res => resolve())
        .catch(e => reject(e))
    }
  })
}

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    userCollections.findOne({ username: this.data.username }, (err, attemtedUser) => {
      if (attemtedUser && bcrypt.compareSync(this.data.password, attemtedUser.password)) {
        resolve(attemtedUser)
      } else {
        reject("Invalid Username/password")
      }
    })
  })
}

User.prototype.getAllUsers = function () {
  return new Promise((resolve, reject) => {
    userCollections
      .find()
      .toArray()
      .then(function (users) {
        resolve(users)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

User.prototype.getUserById = function (userId) {
  return new Promise((resolve, reject) => {
    // console.log(userId)
    userCollections.findOne({ _id: ObjectId(userId) }, function (err, user) {
      if (user) {
        console.log(user)
        resolve(user)
      } else {
        console.log(err)
        reject(err)
      }
    })
  })
}
module.exports = User
