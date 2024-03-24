const express = require("express");
const router = express.Router();

const { getAllRooms, getSingleRoom } = require("../controllers/roomController");

router.get("/", getAllRooms);
router.get("/:id", getSingleRoom);

module.exports = router;
