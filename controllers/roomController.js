const Room = require("../models/Room");

async function getAllRooms(req, res) {
  try {
    const rooms = await Room.find().sort({ name: 1 }); // Rooms are sorted by their name in ascending order
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

module.exports = { getAllRooms, getSingleRoom };
