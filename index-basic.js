import { EventEmitter } from "events";
// const EventEmitter = require("events");

import express from "express";
const app = express();
const PORT = 8000;

const eventEmmiter = new EventEmitter();

eventEmmiter.on("heyEvent", () => {
  console.log("hi there, how u doin?");
});

app.get("/", (req, res) => {
  console.log("you hit the server");
  //   res.send("<h1>hellow world</h1>");
});

app.get("/register", (req, res) => {
  console.log("you hit the register sever");
  res.send("<h1>hellow register sever</h1>");

  eventEmmiter.emit("heyEvent");
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server runnin at http://localhost:${PORT}`);
});
