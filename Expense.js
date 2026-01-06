const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");
const totalBudget = document.getElementById("totalBudget");
const remainingBudget = document.getElementById("remainingBudget");

const expForm = document.getElementById("expenseForm");
const expName = document.getElementById("expenseName");
const expAmount = document.getElementById("expenseAmount");
const expList = document.getElementById("expenseList");
const amountError = document.getElementById("alert");

myBudget = 0;
myRemaining = 0;

function saveToLocal() {
  localStorage.setItem("budget", myBudget);
  localStorage.setItem("remaining", myRemaining);
  localStorage.setItem("expenses", expList.innerHTML);
}

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  myBudget = budgetInput.value;
  myRemaining = myBudget;

  totalBudget.innerHTML = myBudget;
  remainingBudget.innerHTML = myRemaining;
  saveToLocal();
  budgetInput.value = "";
  expList.innerHTML = "";
});

expForm.addEventListener("submit", (event) => {
  event.preventDefault();
  name = expName.value;
  amount = expAmount.value;

  if (amount > myRemaining) {
    amountError.classList.remove("hidden");
    return;
  }

  amountError.classList.add("hidden");
  myRemaining -= amount;
  console.log(myRemaining);
  remainingBudget.innerHTML = myRemaining;

  displayDiv = document.createElement("div");
  displayDiv.innerHTML = `
  <span> ${name} </span>
  <span> ${amount} </span>
  `;
  displayDiv.className =
    "flex justify-between border border-red-300 bg-red-100 p-3 rounded-lg";
  expList.appendChild(displayDiv);
  saveToLocal();
  expName.value = "";
  expAmount.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  savedbudget = localStorage.getItem("budget");
  savedRemaining = localStorage.getItem("remaining");
  savedExpenses = localStorage.getItem("expenses");

  if (savedbudget) {
    myBudget = savedbudget;
    totalBudget.innerHTML = myBudget;
  }

  if (savedRemaining) {
    myRemaining = savedRemaining;
    remainingBudget.innerHTML = myRemaining;
  }

  if (savedExpenses) {
    expList.innerHTML = savedExpenses;
  }
});
