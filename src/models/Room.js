const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const roomSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "room number missing or incorrect"],
  },
  capacity: {
    type: Number,
    required: [true, "room capacity missing or incorrect"],
  },
  floor: {
    type: Number,
    required: [true, "room floor missing or incorrect"],
  },
  room_image: {
    type: String,
    required: [true, "room image missing or incorrect"],
  },
  price: {
    type: Number,
    required: [true, "room price missing or incorrect"],
  },
  wifi: {
    type: Boolean,
    required: [true, "room wifi missing or incorrect"],
  },
  parking: {
    type: Boolean,
    required: [true, "room parking missing or incorrect"],
  },
  breakfast: {
    type: Boolean,
    required: [true, "room breakfast missing or incorrect"],
  },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
  availability: {
    type: Boolean,
    default: true,
  },
});

roomSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Room", roomSchema);
