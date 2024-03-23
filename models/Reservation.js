const mongoose = require("mongoose");

const reservationInfoSchema = new mongoose.Schema({
  checkin: {
    type: Date,
    required: [true, "Check-in date is missing or incorrect"],
  },
  checkout: {
    type: Date,
    required: [true, "Check-out date is missing or incorrect"],
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Room information is missing or incorrect"],
  },
});

const reservationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Reservation code is missing or incorrect"],
  },
  name: {
    type: String,
    required: [true, "Name is missing or incorrect"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  reservation_information: {
    type: reservationInfoSchema,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
