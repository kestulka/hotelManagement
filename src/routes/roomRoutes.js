const express = require("express");
const router = express.Router();

const {
  getAllRooms,
  getSingleRoom,
  getRoomAvailability,
} = require("../controllers/roomController");

const { roomReservation } = require("../controllers/reservationController");

router.get("/", getAllRooms);
router.get("/:id", getSingleRoom);
router.get(
  "/availability/checkin/:checkInDate/checkout/:checkOutDate", // BUTINAI SUZIURETI NAMINGA (checkInDate....)
  getRoomAvailability,
); // kad pratestuoti reikia pirma padaryti reservation controlleri
router.post("/:id/reservation", roomReservation);

module.exports = router;
