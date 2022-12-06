const express = require("express");
const fs = require("fs");
const path = require("path");

const fileReader = require("./fileReader");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 5500;

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/..homepage.html`));
});

app.get("/api/package", async (req, res) => {
  const fileData = await fileReader(path.join(`${__dirname}/pkgs.json`));

  console.log(JSON.parse(fileData));

  // console.log(fileData.toString());
  res.send(JSON.parse(fileData));
  // res.send(fileData.toString());
});

app.get(`/api/package/${id}`, async (req, res) => {
  const fileData = await fileReader(path.join(`${__dirname}/pkgs.json`));
  // fileData.forEach(element=>console.log(element))
  console.log(JSON.parse(fileData).packages[id]);
  // console.log(typeof fileData[0].toString());
  res.send(JSON.parse(fileData).packages[id]);
  // res.send(fileData[0].toString());
});
