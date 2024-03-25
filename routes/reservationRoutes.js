const express = require("express");
const router = express.Router();

const {
  getReservations,
  cancelReservation,
} = require("../controllers/reservationController");

router.get("/", getReservations);
router.post("/:id/cancel", cancelReservation);

module.exports = router;
