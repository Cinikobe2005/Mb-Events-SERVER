const router = require("express").Router();
const {
  createEvents,
  getUpcomingEvents,
  getFreeEvents,
} = require("../controllers/eventController");
const auth = require("../middleware/auth");

router.post("/", auth, createEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/free", getFreeEvents);

module.exports = router;
