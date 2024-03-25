const Room = require("../models/Room");

async function getAllRooms(req, res) {
  try {
    const rooms = await Room.find().sort({ name: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSingleRoom(req, res) {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        message: "Returned if a room with the specified ID does not exist",
      });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRoomAvailability(req, res) {
  try {
    const { checkInDate, checkOutDate } = req.params;

    if (!checkInDate) {
      return res.status(400).json({
        message: "Bad checkin date format or date not provided",
      });
    }
    if (!checkOutDate) {
      return res.status(400).json({
        message: "Bad checkout date format or date not provided",
      });
    }

    const availability = await Room.find({
      "reservations.checkin": { $not: { $lte: new Date(checkInDate) } },
      "reservations.checkout": { $not: { $lte: new Date(checkOutDate) } },
    });

    const roomArr = availability.map((room) => ({
      id: room.id,
      number: room.number,
      availability: true,
    }));

    res.status(200).json({ roomArr });
  } catch (error) {
    return res.status(404).json({
      message: " Returned if dates are provided in incorrect format.",
    });
  }
}

module.exports = { getAllRooms, getSingleRoom, getRoomAvailability };
