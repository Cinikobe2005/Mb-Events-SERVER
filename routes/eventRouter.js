const router = require("express").Router();
const {
  createEvents,
  getUpcomingEvents,
  getFreeEvents,
  getSingleEvent,
  getAllEvents,
  getEventsToAttend,
  getpreviousEvents,
  payForAnEvent,
  getHostedEvents,
} = require("../controllers/eventController");
const auth = require("../middleware/auth");

router.post("/", auth, createEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/free", getFreeEvents);
router.get("/", getAllEvents),
  router.get("/hosted", auth, getHostedEvents),
  router.post("/pay/:eventId", auth, payForAnEvent);
router.get("/previous", auth, getpreviousEvents);
router.get("/attending", auth, getEventsToAttend);
router.get("/:eventId", getSingleEvent);

module.exports = router;
