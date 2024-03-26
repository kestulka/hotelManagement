require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");

const connectToDB = require("./src/config/db");

connectToDB();

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3333;
app.set("port", port);

// routes

app.use("/api/v1/rooms", require("./src/routes/roomRoutes"));
app.use("/api/v1/reservations", require("./src/routes/reservationRoutes"));

app.use(express.static(__dirname + "/src"));

app.get("/module-f", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started running at http://localhost:${port}`);
});
