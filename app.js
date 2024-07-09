const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();

const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const chess = new Chess();
let palyers = {};
let currentPlayer = "W";

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("connected");

  if (!palyers.white) {
    palyers.white = socket.id;
    socket.emit("playersRole", "w");
  } else if (!players.black) {
    palyers.black = socket.id;
    socket.emit("playersRole", "b");
  } else {
    socket.emit("spectatorRole");
  }
  socket.on("disconnected", () => {
    if (socket.id === players.white) {
      delete players.white;
    } else if (socket.id === players.black) {
      delete players.black;
    }
  });
});
server.listen(3000);
