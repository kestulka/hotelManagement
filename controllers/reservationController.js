const Reservation = require("../models/Reservation");
const Room = require("../models/Room"); // Import the Room model

async function getAllReservations(req, res) {
  try {
    const reservations = await Reservation.find();
    res.json({ reservations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSingleReservation(req, res) {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json({ reservations: [reservation] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createReservation(req, res) {
  try {
    const { roomId } = req.params;
    const { name, address, city, zip, country, checkin, checkout } = req.body;

    // Validate request body
    const errors = {};
    if (!name || typeof name !== "string") {
      errors.name = "The name field is required and must be a string.";
    }
    if (!address || typeof address !== "string") {
      errors.address = "The address field is required and must be a string.";
    }
    if (!city || typeof city !== "string") {
      errors.city = "The city field is required and must be a string.";
    }
    if (!zip || typeof zip !== "string") {
      errors.zip = "The zip field is required and must be a string.";
    }
    if (!country || typeof country !== "string") {
      errors.country = "The country field is required and must be a string.";
    }
    if (!checkin || !checkout) {
      errors.dates = "Both checkin and checkout dates are required.";
    }

    if (Object.keys(errors).length > 0) {
      return res
        .status(422)
        .json({ error: "Validation failed", fields: errors });
    }

    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .json({ error: "A room with this ID does not exist" });
    }

    // Create reservation
    const reservation = new Reservation({
      name,
      address,
      city,
      zip,
      country,
      checkin,
      checkout,
      room: roomId,
    });
    await reservation.save();

    // Generate reservation code (dummy code for demonstration)
    const reservationCode = generateReservationCode();

    // Construct response
    const response = {
      reservations: [
        {
          id: reservation._id,
          code: reservationCode,
          name: reservation.name,
          created_at: reservation.created_at,
          reservation_information: {
            id: reservation._id,
            checkin: reservation.checkin,
            checkout: reservation.checkout,
            room: {
              id: room._id,
              number: room.number,
            },
          },
        },
      ],
    };

    // Return response
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Dummy function to generate reservation code
function generateReservationCode() {
  return Math.random().toString(36).slice(2, 12).toUpperCase();
}

module.exports = {
  getAllReservations,
  getSingleReservation,
  createReservation,
};
