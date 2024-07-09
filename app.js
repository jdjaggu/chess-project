const express = require('express');
const socket = require("socket.io");
const http = require("http");
const { Chess } = require('chess.js');
const path = require('path');

const app = express();

const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname,"public")));
app.set('view engine', 'ejs');

const chess = new Chess();
let palyers = {};
let currentPlayer = "W";

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000);