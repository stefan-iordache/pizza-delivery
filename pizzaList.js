const input = document.getElementById("input")
const root = document.getElementById("mainComponents")
const filterButton = document.getElementById("filterBtn")
const submit = document.getElementById("submit")
const form = document.getElementById("form")
submit.classList.add("hide")

let orderedPizzas = [];


fetch('../pizza.json')
    .then((response) => response.json())
    .then(
        (pizzaList) =>{ console.log(pizzaList)
        pizzaList.forEach((pizza) => {
        orderedPizzas.push({ "id": pizza.id, "amount": 0 });
        let product = document.createElement("div");
        product.setAttribute("class", "product");

        let imgbox = document.createElement("div");
        imgbox.setAttribute("class", "image-box");

        let img = document.createElement("div");
        img.setAttribute("class", "images");
        img.setAttribute("id", `images-${pizza.id}`);
        imgbox.appendChild(img);
        product.appendChild(imgbox);

        let txtbox = document.createElement("div");
        txtbox.setAttribute("class", "text-box");

        let name = document.createElement("h2");
        name.setAttribute("class", "item");
        name.innerText = pizza.name

        let description = document.createElement("p");
        description.setAttribute("class", "item");
        description.innerText=pizza.ingredients.toString();

        let quantity=document.createElement("h3");
        quantity.setAttribute("class", "item");
        quantity.innerText=`Quantity: 0`


        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove from Cart";

        let addBtn = document.createElement("button");
        addBtn.innerText = "Add to Cart";


        let numberOfPizza = document.createElement("p");
        numberOfPizza.innerText = "";

        addBtn.addEventListener("click",()=>{
            quantity.innerText=`Quantity: ${++orderedPizzas[pizza.id-1].amount}`
            submit.classList.remove("hide")
        })

        removeBtn.addEventListener("click",()=>{
            orderedPizzas[pizza.id-1].amount>=1
            ?quantity.innerText=`Quantity: ${--orderedPizzas[pizza.id-1].amount}`
            :null
            orderedPizzas.find((pizza)=>pizza.amount>0)===undefined
            ?submit.classList.add("hide")
            :null
        })
        txtbox.appendChild(name);
        txtbox.appendChild(description);
        txtbox.appendChild(addBtn);
        txtbox.appendChild(removeBtn);
        txtbox.appendChild(quantity);
        product.appendChild(txtbox);
        root.appendChild(product);
        
        //form.appendChild(product)
    });
    
    filterButton.addEventListener("click",()=>{
        let arr=input.value.split(" ")
        console.log(arr);
        console.log(root.childNodes[0]);
        pizzaList.forEach(pizza=>{
            let res = pizza.allergens.filter(allergen => arr.includes(allergen.toString()));
            if(res.length===arr.length || arr[0]==="")
                root.childNodes[pizza.id-1].classList.remove("hide")
                
                else
                root.childNodes[pizza.id-1].classList.add("hide")
                
        })
    })
    
})  

submit.addEventListener("click", () => {
    let testing = document.createElement("input")
    testing.value = JSON.stringify(orderedPizzas)
    testing.setAttribute("name", "pizzas")
    testing.style.visibility = "hidden"
    form.appendChild(testing)
})