let budget = 6000;

const budgetSpan = document.getElementById("value");
const input = document.getElementById("input");
const buttons = document.querySelectorAll(".categories button");

budgetSpan.textContent = budget;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const amount = Number(input.value);

    if (!amount || amount <= 0) return;

    budget -= amount;
    budgetSpan.textContent = budget;
    input.value = "";
  });
});


