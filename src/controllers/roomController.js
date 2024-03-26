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

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({
        message: "Bad check-in or check-out date format or date not provided",
      });
    }

    const availability = await Room.find({
      $nor: [
        // Check if any reservation overlaps with the requested date range
        {
          $and: [
            { "reservations.checkin": { $lt: new Date(checkOutDate) } },
            { "reservations.checkout": { $gt: new Date(checkInDate) } },
          ],
        },
        // Check if there are no reservations for the room
        { reservations: { $exists: false } },
      ],
    });

    const roomArr = availability.map((room) => ({
      id: room.id,
      number: room.number,
      availability: true,
    }));

    res.status(200).json({ roomArr });
  } catch (error) {
    return res.status(500).json({
      message: "Error finding room availability",
      error: error.message,
    });
  }
}

module.exports = { getAllRooms, getSingleRoom, getRoomAvailability };
