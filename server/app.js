const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
    console.log(bind + " requires elevated privileges");
    process.exit(1);
    break;
  case "EADDRINUSE":
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
  console.log("Server Listening on " + bind);
};
server.on("listening", onListening);
