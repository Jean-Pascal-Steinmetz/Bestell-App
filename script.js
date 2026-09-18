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

let basket = [];
const DELIVERY_FEE = 4.99;

function renderItems() {
  for (let i = 0; i < items.length; i++) {
    document.getElementById(`itemList`).innerHTML += `
<div class="single-dish">
  <h3>${items[i].name}</h3>
  <img src="${items[i].img}" alt="${items[i].name}">
  <p class="preis">${items[i].price}</p>
  <p class="include">${items[i].include}</p>
  <button class="add-to-basket" id="btn-${i}" onclick="addToBasket(${i})">Add to basket</button>
</div>`;
  }
}
renderItems();

// WARENKORB 

function parsePrice(priceStr) {
  return parseFloat(priceStr.replace("€", "").replace(",", "."));
}

function formatPrice(num) {
  return num.toFixed(2).replace(".", ",") + "€";
}

function findIndexByName(name) {
  return items.findIndex((i) => i.name === name);
}

function addToBasket(index) {
  const item = items[index];
  const existing = basket.find((b) => b.name === item.name);
  if (existing) {
    existing.amount++;
  } else {
    basket.push({ ...item, amount: 1 });
  }
  syncButton(item.name);
  renderBasket();
}

function changeAmount(name, delta) {
  const basketItem = basket.find((b) => b.name === name);
  if (!basketItem) return;
  basketItem.amount += delta;
  if (basketItem.amount <= 0) {
    removeFromBasket(name);
    return;
  }
  syncButton(name);
  renderBasket();
}

function removeFromBasket(name) {
  basket = basket.filter((b) => b.name !== name);
  syncButton(name);
  renderBasket();
}

function syncButton(name) {
  const index = findIndexByName(name);
  if (index === -1) return;
  const btn = document.getElementById(`btn-${index}`);
  const basketItem = basket.find((b) => b.name === name);
  if (basketItem) {
    btn.textContent = `Added ${basketItem.amount}`;
    btn.classList.add("added");
  } else {
    btn.textContent = "Add to basket";
    btn.classList.remove("added");
  }
}

function renderBasket() {
  const basketContent = document.getElementById("basketContent");

  if (basket.length === 0) {
    basketContent.innerHTML = `
      <div class="basket">
        <h2>Your Basket</h2>
        <p class="basket-empty">Dein Warenkorb ist leer.</p>
      </div>`;
    return;
  }

  let subtotal = 0;
  let itemsHTML = "";

  basket.forEach((item) => {
    const priceNum = parsePrice(item.price);
    const lineTotal = priceNum * item.amount;
    subtotal += lineTotal;

    itemsHTML += `
      <div class="basket-item">
        <p class="basket-item-name">${item.amount} x ${item.name}</p>
        <div class="basket-item-row">
          <button class="delete-btn" onclick="removeFromBasket('${item.name}')">🗑 ${item.amount}</button>
          <button class="amount-btn" onclick="changeAmount('${item.name}', 1)">+</button>
          <span class="basket-item-price">${formatPrice(lineTotal)}</span>
        </div>
      </div>`;
  });

  const total = subtotal + DELIVERY_FEE;

  basketContent.innerHTML = `
    <div class="basket">
      <h2>Your Basket</h2>
      <div class="basket-items">${itemsHTML}</div>
      <div class="basket-summary">
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Delivery fee</span><span>${formatPrice(DELIVERY_FEE)}</span></div>
        <div class="summary-row total-row"><span>Total</span><span>${formatPrice(total)}</span></div>
      </div>
      <button class="buy-now-btn" id="buyNowBtn" onclick="checkout()">Buy now (${formatPrice(total)})</button>
    </div>`;
}

renderBasket();

const overlay = document.getElementById("overlay");
const orderPopup = document.getElementById("orderPopup");
const popupClose = document.getElementById("popupClose");
const basketContent = document.getElementById("basketContent"); 

basketContent.addEventListener("click", (e) => {
  if (e.target.closest("#buyNowBtn")) {
    overlay.classList.add("show");
    orderPopup.classList.add("show");
  }
});

function closePopup() {
  overlay.classList.remove("show");
  orderPopup.classList.remove("show");
}

popupClose.addEventListener("click", closePopup);
overlay.addEventListener("click", closePopup);
