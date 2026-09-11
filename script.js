const items = [
  {
    name: "Veggie mushroom black burger",
    include: "Mixed green salad, Tomatoes, Edamame, Mushrooms",
    price: "16,90€",
    img: "assets/img/veggie-mushroom.png",
  },
  {
    name: "All meat burger",
    include: "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ sauce",
    price: "15,90€",
    img: "assets/img/all-meat.png",
  },
  {
    name: "Beef red burger",
    include: "Beef, Cheese, Tomatoes, Lettuce, Onion",
    price: "14,90€",
    img: "assets/img/beef-red.png",
  },
  {
    name: "Big chicken burger",
    include: "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
    price: "15,90€",
    img: "assets/img/big-chicken.png",
  },
];

function renderItems() {
  for (let i = 0; i < items.length; i++) {
    document.getElementById(`itemList`).innerHTML += `
    
<div class="single-dish">
  <h3>${items[i].name}</h3>
  <img src="${items[i].img}" alt="${items[i].name}">
  <p class="preis">${items[i].price}</p>
  <p class="include">${items[i].include}</p>
  <button class="add-to-basket" onclick="addToBasket(${i})">Add to basket</button>
</div>`
  }
}
renderItems();