// Die Gerichte als Datenobjekte - so kannst du sie leicht erweitern
const items = [
  {
    name: "Veggie mushroom black burger",
    desc: "Mixed green salad, Tomatoes, Edamame, Mushrooms",
    price: "16,90€",
    img: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300"
  },
  {
    name: "All meat burger",
    desc: "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ sauce",
    price: "15,90€",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
  },
  {
    name: "Beef red burger",
    desc: "Beef, Cheese, Tomatoes, Lettuce, Onion",
    price: "14,90€",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300"
  }
];

const list = document.getElementById("itemList");

items.forEach((item, index) => {
  const row = document.createElement("div");
  row.className = "item";
  row.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
    <div class="item-info">
      <div class="item-title-row">
        <h3>${item.name}</h3>
        <span class="item-price">${item.price}</span>
      </div>
      <p class="item-desc">${item.desc}</p>
      <button class="add-btn" data-count="0">Add to basket</button>
    </div>
  `;
  list.appendChild(row);
});

// Klick-Logik für alle "Add to basket"-Buttons
list.addEventListener("click", (e) => {
  if (!e.target.classList.contains("add-btn")) return;
  const btn = e.target;
  let count = parseInt(btn.dataset.count, 10) + 1;
  btn.dataset.count = count;
  btn.textContent = "Added " + count;
  btn.classList.add("added");
});