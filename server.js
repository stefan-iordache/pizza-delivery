const express = require("express");
const fs = require("fs");
const path = require("path");

const fileReader = require("./fileReader");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname))

const port = 9000;


let finalOrder = { "id" : 0, "pizzas" : [], "date" : {}, "customer" : {}}
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


app.get("/pizza/list", (req, res) => {
    res.sendFile(path.join(`${__dirname}/pizzaList.html`));
});

app.post("/pizza/list", (req, res) => {
  let jsonParse = JSON.parse(req.body.pizzas)
  console.log(JSON.stringify(req.body))
  jsonParse.map( (pizza) => {
    if (pizza.amount != 0) order.push(pizza)
  });
  let tempOrder = {"id" : ++id, "pizzas" : order}
  
  fs.writeFileSync(`${__dirname}/order.json`, JSON.stringify(tempOrder, null, 2))
  res.sendFile(path.join(`${__dirname}/form.html`));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(`${__dirname}/form.html`));
});

// "{\"orders\":" + JSON.stringify(tempOrder, null, 2) +"}"
app.post("/form", async (req, res) => {
  const fileData = await fileReader(`${__dirname}/order.json`);
  const data = JSON.parse(fileData);
  const d = new Date();
  let dateObj = {"year" : d.getFullYear(), "month" : d.getMonth(), "day" : d.getDate(), "hour" : d.getHours(), "minute" : d.getMinutes()}
  customer = req.body
  finalOrder.id = data.id
  finalOrder.pizzas = data.pizzas
  finalOrder.date = dateObj
  finalOrder.customer = customer
  fs.writeFileSync(`${__dirname}/order.json`, "{\" orders\":" + JSON.stringify(finalOrder) + "}")
  res.sendFile(path.join(`${__dirname}/order.json`));
});




app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));