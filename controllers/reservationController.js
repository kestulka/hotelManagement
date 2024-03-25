const Reservation = require("../models/Reservation");
const Room = require("../models/Room");

function generateRandomString() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function roomReservation(req, res) {
  try {
    const reservationCode = generateRandomString();

    const reservation = await Reservation.create({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      code: reservationCode,
    });

    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Returned if a room with the specified ID does not exist",
      });
    }

    room.reservations.push({
      _id: reservation._id,
      code: reservationCode,
    });
    await room.save();
    res.status(201).json(reservation);
  } catch (error) {
    if (error.name === "ValidationError") {
      const fields = {};
      for (const field in error.errors) {
        fields[field] = error.errors[field].message;
      }
      return res.status(422).json({
        error: "Validation failed",
        fields: fields,
      }); // error catch kopijuotas is ai
    }
  }
}

async function getReservations(req, res) {
  const { name, code } = req.body;
  try {
    if (!name || !code) {
      return res.status(400).json({
        message: "name and code fields are required to fill",
      });
    }

    const reservations = await Reservation.find({
      name: name,
      code: code,
    }).sort({ checkin: 1 });
    res.status(200).json(reservations);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

module.exports = { roomReservation, getReservations };
