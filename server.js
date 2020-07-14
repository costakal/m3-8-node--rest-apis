"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { response } = require("express");

const {
  handleClients,
  handleAddClient,
  handleClient,
  handleDeleteClient,
} = require("./handlers/clientHandlers");

const {
  handleWord,
  handleHangman,
  handleGuess,
} = require("./handlers/hangmanHandlers");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // Request for Clients
  .get("/clients", handleClients)
  .post("/clients", handleAddClient)
  .get("/clients/:id", handleClient)
  .delete("/clients/:id", handleDeleteClient)

  // Resquest for Hangman
  .get("/hangman/word/:id", handleWord)
  .get("/hangman/word", handleHangman)
  .get("/hangman/guess/:id/:letter", handleGuess)

  .get("/", (req, res) => {
    res.status(404);
    res.send("Unable to find clients");
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
