document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expense-form");
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const dateInput = document.getElementById("date");
  const expensesList = document.getElementById("expenses-list");

  // Check local storage for existing expenses
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Render existing expenses
  renderExpenses();

  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (description && !isNaN(amount) && date) {
      const expense = {
        id: new Date().getTime(),
        description,
        amount,
        date,
      };

      expenses.push(expense);

      // Save expenses to local storage
      localStorage.setItem("expenses", JSON.stringify(expenses));

      // Clear form inputs
      descriptionInput.value = "";
      amountInput.value = "";
      dateInput.value = "";

      // Render updated expenses
      renderExpenses();
    }
  });

  function renderExpenses() {
    // Clear expenses list
    expensesList.innerHTML = "";

    // Render each expense
    expenses.forEach(function (expense) {
      const expenseItem = document.createElement("div");
      expenseItem.innerHTML = `
                <p>${expense.description} - $${expense.amount.toFixed(2)} - ${
        expense.date
      }</p>
                <button class="edit-btn" onclick="editExpense(${
                  expense.id
                })">Edit</button>
                <button class="delete-btn" onclick="deleteExpense(${
                  expense.id
                })">Delete</button>
            `;
      expensesList.appendChild(expenseItem);
    });
  }

  window.editExpense = function (id) {
    const expenseToEdit = expenses.find((expense) => expense.id === id);

    if (expenseToEdit) {
      // Update form inputs with the selected expense details
      descriptionInput.value = expenseToEdit.description;
      amountInput.value = expenseToEdit.amount;
      dateInput.value = expenseToEdit.date;

      // Remove the selected expense from the expenses array
      expenses = expenses.filter((expense) => expense.id !== id);

      // Save the updated expenses array to local storage
      localStorage.setItem("expenses", JSON.stringify(expenses));

      // Render updated expenses
      renderExpenses();
    }
  };

  window.deleteExpense = function (id) {
    // Remove the selected expense from the expenses array
    expenses = expenses.filter((expense) => expense.id !== id);

    // Save the updated expenses array to local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Render updated expenses
    renderExpenses();
  };
});
