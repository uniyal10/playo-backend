const Event = require("../models/Event")
exports.createEvent = function (req, res) {
  let event = new Event(req.body, req.user._id, req.user.username)
  event
    .createEvent()
    .then(function (r) {
      res.json(r)
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
}

exports.getEvents = function (req, res) {
  const event = new Event()
  event
    .getEvents()
    .then(function (result) {
      res.json(result)
    })
    .catch(function (err) {
      res.json(err)
    })
}
exports.getEventById = function (req, res) {
  const event = new Event()
  event
    .getEventById(req.params.id)
    .then(function (event) {
      res.json(event)
    })
    .catch(function (err) {
      res.json(err)
    })
}
exports.addRequest = function (req, res) {
  const eventId = req.body.eventId
  const requestId = req.body.user.requestId
  const username = req.body.user.username
  const event = new Event()
  console.log(requestId)
  console.log(username)
  event
    .addRequest(eventId, requestId, username)
    .then(function (event) {
      res.json(event)
    })
    .catch(function (err) {
      res.json(err)
    })
}

exports.acceptRequest = function (req, res) {
  const eventId = req.body.eventId
  const requestId = req.body.user.requestId
  const username = req.body.user.username
  //console.log(eventId + "" + requestId)
  const event = new Event()
  event
    .acceptRequest(eventId, requestId, username)
    .then(function (event) {
      res.json(event)
    })
    .catch(function (err) {
      res.json(err)
    })
}

exports.rejectRequest = function (req, res) {
  const eventId = req.body.eventId
  const requestId = req.body.requestId

  //console.log(eventId + "" + requestId)
  const event = new Event()
  event
    .rejectRequest(eventId, requestId)
    .then(function (event) {
      res.json(event)
    })
    .catch(function (err) {
      res.json(err)
    })
}
