const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "reservator name missing or incorrect"],
  },
  address: {
    type: String,
    required: [true, "address missing or incorrect"],
  },
  city: {
    type: String,
    required: [true, "city missing or incorrect"],
  },
  zip: {
    type: String,
    required: [true, "zip code missing or incorrect"],
  },
  country: {
    type: String,
    required: [true, "country missing or incorrect"],
  },
  checkin: {
    type: String,
    required: [true, "checkin date missing or incorrect"],
  },
  checkout: {
    type: String,
    required: [true, "checkout date missing or incorrect"],
  },
});

module.exports = mongoose.model("Reservation", reservationSchema);
