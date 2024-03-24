require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");

const app = express();

app.use(express.json());

const port = process.env.PORT || 1111;
app.set("port", port);

connectToDB();

// routing

app.use("/api/v1/rooms", require("./routes/roomRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Server started running at http://localhost:${process.env.PORT}`);
});
