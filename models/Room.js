const mongoose = require("mongoose");
const mongooseAutoIncrement = require("mongoose-auto-increment");

mongooseAutoIncrement.initialize(mongoose.connection); // suconnectina prijungta db instancija
const roomSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "room id missing or incorrect"],
  },
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
});

roomSchema.plugin(mongooseAutoIncrement.plugin, {
  model: "Room",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("Room", roomSchema);
