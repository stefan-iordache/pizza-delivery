const input = document.getElementById("input")
const root = document.getElementById("mainComponents")
const filterButton = document.getElementById("filterBtn")
const submit = document.getElementById("submit")
const form = document.getElementById("form")



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

        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove from Cart";

        let addBtn = document.createElement("button");
        addBtn.innerText = "Add to Cart";




        let numberOfPizza = document.createElement("p");
        numberOfPizza.innerText = "";

        addBtn.addEventListener("click",()=>{
            orderedPizzas[pizza.id-1].amount++;
            console.log(orderedPizzas)
        })

        removeBtn.addEventListener("click",()=>{
            orderedPizzas[pizza.id-1].amount>=1?orderedPizzas[pizza.id-1].amount--:null;
            console.log(orderedPizzas)
        })
        txtbox.appendChild(name);
        txtbox.appendChild(addBtn);
        txtbox.appendChild(removeBtn);
        product.appendChild(txtbox);
        root.appendChild(product);
        
        //form.appendChild(product)
    });
    
    /* filterButton.addEventListener("click",()=>{
        let arr=input.value.split(" ")
        console.log(arr);
        pizzaList.forEach(pizza=>{
            let res = pizza.allergens.filter(allergen => arr.includes(allergen.toString()));
            if(res.length===arr.length || arr[0]==="")
                list.childNodes[pizza.id].classList.remove("hide");
                else
                    list.childNodes[pizza.id].classList.add("hide");
        })
    }) */
    
})  

submit.addEventListener("click", () => {
    let testing = document.createElement("input")
    testing.value = JSON.stringify(orderedPizzas)
    testing.setAttribute("name", "pizzas")
    testing.style.visibility = "hidden"
    form.appendChild(testing)
})