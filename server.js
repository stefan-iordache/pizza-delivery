const express = require("express");
const fs = require("fs");
const path = require("path");

const fileReader = require("./fileReader");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname))

const port = 9000;


let id = 0
let order = []
let date = {}
let customer = {}


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


app.get("/api/order", (req, res) => {
  res.sendFile(path.join(`${__dirname}/order.json`));
});

//JSON.stringify(test, null, 2)
app.post("/order", async (req, res) => {
  fs.writeFileSync(`${__dirname}/order.json`, "{\"orders\":"+ {} + "}");
  res.sendFile(path.join(`${__dirname}/order.json`));
}); 

app.post("/pizza/list", async (req, res) => {
  order = req.body
  id++
  console.log(order)
});

app.get("/pizza/list", (req, res) => {
    res.sendFile(path.join(`${__dirname}/pizzaList.html`));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(`${__dirname}/form.html`));
});

app.post("/form", (req, res) => {
  customer.customer = req.body
  let tempOrder = {"id" : id, "pizzas" : order, "customer" : customer}
  console.log(tempOrder);
  fs.writeFileSync(`${__dirname}/order.json`, "{\"orders\":" + JSON.stringify(tempOrder, null, 2) +"}")
});

app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));