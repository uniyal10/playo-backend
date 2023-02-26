const express = require("express")
const router = express.Router()
const userController = require("./controllers/userController")
const eventController = require("./controllers/eventController")

router.get("/users", userController.getAllUsers)
router.get("/users/:id", userController.getUserById)
router.get("/events", eventController.getEvents)
router.get("/events/:id", eventController.getEventById)

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/createEvent", userController.checkToken, eventController.createEvent)
router.post("/events/request", eventController.addRequest)
router.post("/events/accept", eventController.acceptRequest)
router.post("/events/reject", eventController.rejectRequest)

module.exports = router
