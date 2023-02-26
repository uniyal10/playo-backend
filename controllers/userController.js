const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { json } = require("express")

exports.register = function (req, res) {
  const user = new User(req.body)
  user
    .register()
    .then(function () {
      const token = jwt.sign({ _id: user.data._id, username: user.data.username }, process.env.JWTSECRETKEY, { expiresIn: "1h" })
      res.json({ token: token, username: user.data.username, userId: user.data._id })
      //  console.log(user.data._id)
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
}
exports.checkToken = function (req, res, next) {
  try {
    req.user = jwt.verify(req.body.token, process.env.JWTSECRETKEY)
    //console.log(req.body.token)
    next()
  } catch (e) {
    res.json(false)
  }
}

exports.login = function (req, res) {
  const user = new User(req.body)
  user
    .login()
    .then(function (data) {
      const token = jwt.sign({ _id: data._id, username: data.username }, process.env.JWTSECRETKEY, { expiresIn: "1h" })
      res.json({ token: token, username: data.username, userId: data._id })
      //console.log(user.data._id)
    })
    .catch(function () {
      res.json(false)
    })
}

exports.getAllUsers = function (req, res) {
  const user = new User()
  user
    .getAllUsers()
    .then(function (users) {
      res.json(users)
    })
    .catch(function (err) {
      res.json(err)
    })
}

exports.getUserById = function (req, res) {
  // res.json(req.params.id)
  const user = new User()
  user
    .getUserById(req.params.id)
    .then(function (r) {
      res.json(r)
    })
    .catch(function (err) {
      res.json(err)
    })
}
