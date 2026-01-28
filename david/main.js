export const categoryIconMap = new Map([
  ["Eat", "fa-solid fa-ice-cream"],
  ["Beer", "fa-solid fa-beer-mug-empty"],
  ["Bikes", "fa-solid fa-bicycle"],
  ["Books", "fa-solid fa-book"],
  ["Energy", "fa-solid fa-lightbulb"],
  ["Kids", "fa-solid fa-baby"],
  ["Croissants", "fa-solid fa-bread-slice"],
  ["Gym", "fa-solid fa-dumbbell"],
  ["Transport", "fa-solid fa-bus"],
  ["Clothes", "fa-solid fa-shirt"],
  ["Games", "fa-solid fa-gamepad"],
  ["Rent", "fa-solid fa-house"],
  ["Gifts", "fa-solid fa-gift"],
  ["Phone", "fa-solid fa-mobile-screen"],
  ["Travel", "fa-solid fa-plane"],
  ["Health", "fa-solid fa-briefcase-medical"],
]);

const categoryItems = document.querySelectorAll(".category-item");
const inputValue = document.querySelector(".input-value");
const addButton = document.querySelector(".add-button");
const currencyAmount = document.querySelector(".currency-amount");
const transactionList = document.querySelector(".transaction-list");

const initialBudget = 6000;
let selectedCategory = null;
const transactions = [];

// Init the application budhet
document.addEventListener("DOMContentLoaded", () => {
  currencyAmount.textContent = `${initialBudget}$`;
});

function selectCategory(item, category) {
  selectedCategory = category;
  categoryItems.forEach((item) => {
    item.classList.remove("selected");
  });

  item.classList.add("selected");
  console.log(selectedCategory);
}

categoryItems.forEach((item) => {
  item.addEventListener("click", () => {
    selectCategory(item, item.dataset.category);
  });
});

function createTransactionItemHTML(transaction) {
  const iconClass =
    categoryIconMap.get(transaction.category) || "fa-solid fa-question";
  const time = new Date(transaction.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return /* html */ `
    <div class="transaction-item">
        <div class="transaction-info">
            <div class="transaction-icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="transaction-details">
                <span class="transaction-category">${transaction.category}</span>
                <span class="transaction-time">${time}</span>
            </div>
        </div>
        <span class="transaction-amount">-${transaction.amount.toFixed(2)}$</span>
    </div>`;
}

function render() {
  const totalSpent = transactions.reduce((acc, t) => acc + t.amount, 0);
  currencyAmount.textContent = `${(initialBudget - totalSpent).toFixed(2)}$`;

  transactionList.classList.toggle("hidden", transactions.length === 0);

  transactionList.innerHTML = transactions
    .map(createTransactionItemHTML)
    .join("");
}

addButton.addEventListener("click", () => {
  const amount = Number.parseFloat(inputValue.value);
  if (selectedCategory && amount > 0) {
    transactions.push({
      category: selectedCategory,
      amount,
      date: new Date(),
    });

    inputValue.value = "";
    selectedCategory = null;
    categoryItems.forEach((item) => {
      item.classList.remove("selected");
    });

    render();
  }
});

render();
