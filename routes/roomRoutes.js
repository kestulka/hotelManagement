const express = require("express");
const router = express.Router();

const {
  getAllRooms,
  getSingleRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomAvailability,
} = require("../controllers/roomController");

router.get("/", getAllRooms);
router.get("/:id", getSingleRoom);
router.post("/", createRoom);
router.get("/:id", updateRoom);
router.get("/:id", deleteRoom);
router.get(
  "/availability/checkin/:checkin/checkout/:checkout",
  getRoomAvailability,
);

module.exports = router;
