const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const cors = require("cors");

const router = require("./controller");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(cors());

app.use("/api", router);

app.use("/socket.io", (request, response) => {
  response.send("Socket Polling :: Service Active");
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.status(err.status || 500).send(err.message);
});

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("subscribe", (roomId) => {
    socket.join(roomId);
  });
  socket.on("unsubscribe", (roomId) => {
    socket.leave(roomId);
  });
  app.locals.io = io;
  app.locals.socket = socket;
});

server.listen(port);

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  switch (error.code) {
  case "EACCES":
    // eslint-disable-next-line no-console
    console.log(bind + " requires elevated privileges");
    process.exit(1);
    break;
  case "EADDRINUSE":
    // eslint-disable-next-line no-console
    console.log(bind + " is already in use");
    process.exit(1);
    break;
  default:
    throw error;
  }
};
server.on("error", onError);

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  // eslint-disable-next-line no-console
  console.log("Server Listening on " + bind);
};
server.on("listening", onListening);

module.exports = app;
