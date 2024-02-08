document.addEventListener("DOMContentLoaded", () => {
document.querySelector("#collection-form").addEventListener("submit", submitEvent)

async function getData() {
    response = await fetch("http://localhost:3000/charData");
    main = await response.json();
    main.forEach(figure => renderFigure(figure));
}

function submitEvent(e) {
    const form = document.querySelector("#collection-form")
    e.preventDefault()
    let newObj = {
        id: (main.length + 1).toString(),
        name: e.target.title.value,
        image: e.target.image_url.value,
        price: parseFloat(e.target.price.value),
        description: e.target.description.value
    }
    main.push(newObj)
    renderFigure(newObj)
    createNew(newObj)
    
    form.reset()
}
function renderFigure(figure) {

    let card = document.createElement("li")
    card.className = "card";
    card.id = figure.id;
    card.innerHTML = `
    <img src="${figure.image}">
    <div class="content">
        <h3>${figure.name}</h3>
        <p><strong>DESCRIPTION</strong>: <h4>${figure.description}</h4></p>
        <p>
            Current Bid : $<span class="bid-amount">${figure.price}</span>
        <p>
    </div>
    <div class="buttons">
    <button id="increase"> Increase Bid $100 </button>
    <button id="buyNow"> Buy Now </button>
    </div>
    `
    card.querySelector("#increase").addEventListener("click", () => {
        figure.price += 100
        card.querySelector("span").textContent = figure.price
        updatePrice(figure)
    })
    card.querySelector("#buyNow").addEventListener("click", () => {
        card.remove();
        buyNow(figure.id)

    document.querySelector("#collection-container").appendChild(card)
    }
function createNew(newObj) {
    fetch("http://localhost:3000/charData",{
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(newObj)
    })
    .then(res => res.json())
    .then(figure => figure)
}
function updatePrice(newObj) {
    fetch(`http://localhost:3000/charData/${newObj.id}`,{
        method: "PATCH",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(newObj)
    })
    .then(res => res.json())
    .then(figure => console.log(figure))
}
function buyNow(id) {
    fetch(`htttp://localhost:3000/charData/`${id}, {
        method: 'DELETE',
        headers: {
            'content-type' : "application/json'
        },
    })
}
getData()
})
