require("dotenv").config();
const express = require("express");
const http = require("http");
// const mongodb = require("./config/db");
const moment = require("moment-timezone");
const createError = require("http-errors");

moment.tz.setDefault("America/New_York");

let port = normalizePort(process.env.PORT || "8080");

const app = express();

require("./cors")(app);

// same as bodyParser.json()
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: false,
    limit: "50mb",
  })
);

// API routes
// require('./routes/allRoutes')(app)

// not found
app.use(async (req, res, next) => {
  next(createError.NotFound("This route doesn't exist"));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  let resData = {
    success: false,
    status: err.status || 500,
    message: err.message,
  };
  res.send(resData);
});

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// mongodb()
//   .then(() => {
//     server.listen(port);
//     server.on("error", onError);
//     server.on("listening", onListening);
//   })
//   .catch((error) => {
//     console.error("Unable to connect to database.");
//     console.trace(error.message);
//     process.exit(1);
//   });

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  // IS_DEV ? Model.knex(knex(knexConfig[process.env.NODE_ENV])) : null
  const addr = server.address();
  console.log("========================================");
  console.log(`**** Listening at : ${addr.address}:${port} ****`);
  console.log("========================================");
}
