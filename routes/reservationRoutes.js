const express = require("express");
const router = express.Router();

const {
  getAllReservations,
  getSingleReservation,
  createReservation,
} = require("../controllers/reservationController");

router.get("/", getAllReservations);
router.get("/:id", getSingleReservation);
router.post("/:roomId/reservation", createReservation);

module.exports = router;
