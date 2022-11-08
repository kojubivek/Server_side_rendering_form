import express from "express";
const app = express();
const PORT = 8000;

import path from "path";
import fs from "fs";

const __dirname = path.resolve();

app.use(express.urlencoded());

const fn = __dirname + "/userList.csv";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/regForm.html");
});

app.post("/", (req, res) => {
  const { email, password } = req.body;
  const dataStr = `${email},${password}\n`;
  console.log(dataStr);

  fs.appendFile(fn, dataStr, (error) => {
    error && console.log(error);

    console.log("check the file");
  });

  res.send(`<h1>form received</h1>
  <p> <a href="/login"> Login now </a> </p>
  `);
});

app.get("/login", (req, res) => {
  console.log("you hit the login  sever");
  res.sendFile(__dirname + "/src/loginForm.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const dataStr = `${email},${password}`;
  fs.readFile(fn, (error, data) => {
    error && console.log(error);

    const usrList = data.toString();
    const usrArg = usrList.split("\n");
    usrArg.includes(dataStr) ? res.send("loggedin") : res.send("invalid login");
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server runnin at http://localhost:${PORT}`);
});
