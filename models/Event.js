const { ObjectId } = require("mongodb")
const eventCollection = require("../db").collection("events")
function Event(data, userId, username, requestedPostId) {
  this.data = data
  this.errors = []
  this.userId = userId
  this.username = username
  this.requestedPostId = requestedPostId
}

Event.prototype.cleanData = function () {
  this.data = {
    eventname: this.data.eventname,
    description: this.data.description,
    size: this.data.size,
    date: this.data.date,
    vanue: this.data.vanue,
    user: {
      id: ObjectId(this.userId),
      username: this.username
    },
    createdDate: new Date(),
    requests: [],
    members: []
  }
}
Event.prototype.createEvent = function () {
  return new Promise((resolve, reject) => {
    this.cleanData()
    eventCollection
      .insertOne(this.data)
      .then(() => {
        resolve(this.data._id)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

Event.prototype.getEvents = function () {
  return new Promise((resolve, reject) => {
    eventCollection
      .find()
      .toArray()
      .then(function (result) {
        resolve(result)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

Event.prototype.getEventById = function (eventId) {
  return new Promise((resolve, reject) => {
    eventCollection
      .findOne({ _id: ObjectId(eventId) })
      .then(function (event) {
        resolve(event)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

Event.prototype.addRequest = function (eventId, requestId, username) {
  return new Promise((resolve, reject) => {
    const requestObject = { requestId: requestId, username: username, createdOn: new Date() }
    eventCollection
      .updateOne({ _id: ObjectId(eventId) }, { $push: { requests: requestObject } })
      .then(function (event) {
        // console.log(requestId)
        resolve(event)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

Event.prototype.acceptRequest = function (eventId, requestId, username) {
  return new Promise((resolve, reject) => {
    eventCollection
      .updateOne({ _id: ObjectId(eventId) }, { $pull: { requests: { requestId: requestId } } })
      .then(function () {
        //console.log("after removing elemetn")
        const memberObject = { memberId: requestId, username: username, createdOn: new Date() }
        eventCollection
          .updateOne({ _id: ObjectId(eventId) }, { $push: { members: memberObject } })
          .then(function (event) {
            resolve(event)
          })
          .catch(function (err) {
            reject(err)
          })
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
Event.prototype.rejectRequest = function (eventId, requestId) {
  return new Promise((resolve, reject) => {
    eventCollection
      .updateOne({ _id: ObjectId(eventId) }, { $pull: { requests: { requestId: requestId } } })
      .then(function (event) {
        resolve(event)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

module.exports = Event
