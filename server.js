const express = require("express");
const fs = require("fs");
const path = require("path");

const fileReader = require("./fileReader");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname))

const port = 9000;

app.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/homepage.html`));
});

app.get("/api/allergens", async (req, res) => {
    const fileData = await fileReader(`${__dirname}/allergens.json`);
    const data = JSON.parse(fileData)
    res.send(data.allergens)
  });

app.get("/api/pizza", async (req, res) => {
    const fileData = await fileReader(`${__dirname}/pizza.json`);
    const data = JSON.parse(fileData)
    res.send(data)
  });

app.get("/pizza/list", async (req, res) => {
    res.sendFile(path.join(`${__dirname}/pizzaList.html`));
  });

app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));