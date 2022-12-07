const input = document.getElementsByTagName("input")



fetch('../pizza.json')
    .then((response) => response.json())
    .then(
        (json) => console.log(json)
        );


