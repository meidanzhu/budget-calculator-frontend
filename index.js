const budgetForm = document.getElementById("budget-form");
const budgetsAdapter = new BudgetsAdapter
const categoriesAdapter = new CategoriesAdapter


function hideBtnLoadForm(e){
  e.target.hidden = true
  const newForm = document.getElementById('new-form-container')
  newForm.hidden = false
}

document.addEventListener('DOMContentLoaded', () => {
  categoriesAdapter.fetchCategories()
  budgetsAdapter.fetchBudgets()
  budgetForm.addEventListener('submit', budgetsAdapter.createBudget)
  const newFormBtn = document.getElementById('new-form-btn')
  newFormBtn.addEventListener('click', hideBtnLoadForm)
})
