const Reservation = require("../models/Reservation");
const Room = require("../models/Room");

async function getAllRooms(req, res) {
  try {
    const rooms = await Room.find().sort({ number: 1 }); // Assuming you want to sort rooms by their number
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSingleRoom(req, res) {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createRoom(req, res) {
  try {
    const {
      number,
      capacity,
      floor,
      room_image,
      price,
      wifi,
      parking,
      breakfast,
    } = req.body;
    const room = new Room({
      number,
      capacity,
      floor,
      room_image,
      price,
      wifi,
      parking,
      breakfast,
    });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateRoom(req, res) {
  try {
    const { roomId } = req.params;
    const {
      number,
      capacity,
      floor,
      room_image,
      price,
      wifi,
      parking,
      breakfast,
    } = req.body;
    const room = await Room.findOneAndUpdate(
      { id: roomId },
      { number, capacity, floor, room_image, price, wifi, parking, breakfast },
      { new: true },
    );
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteRoom(req, res) {
  try {
    const { roomId } = req.params;
    const room = await Room.findOneAndDelete({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRoomAvailability(req, res) {
  try {
    const { checkin, checkout } = req.params;

    // Perform any necessary validation of checkin and checkout dates
    // You can use a library like moment.js for date validation and manipulation

    // Query the database to find available rooms for the given dates
    const availableRooms = await Room.find({
      "reservations.checkin": { $lte: new Date(checkout) },
      "reservations.checkout": { $gte: new Date(checkin) },
    });

    // Construct the response body
    const response = {
      rooms: availableRooms.map((room) => ({
        id: room._id,
        number: room.number,
        availability: true, // Assuming availability is determined based on reservations
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllRooms,
  getSingleRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomAvailability,
};
