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
  const searchBtn = document.getElementById('searchBtn')
  searchBtn.addEventListener('click', myFunction)
})

function myFunction(e) {
  //console.log(e.target.value)
  //const boxes = Array.from(document.getElementsByClassName('box'));
  
  let userInput = document.getElementById('myInput').value
  let numberInput = parseInt(userInput)
  const divs = Array.from(document.getElementById('list').children)
  console.log(numberInput)
  let filterDivs = divs.filter(element => parseInt(element.querySelector('span').innerText) > numberInput)
  filterDivs.forEach(element => element.remove())
  debugger
  // for (let i = 0; i < divs.length ; i++) {
  //   let div = divs[i]
  //   let spanAmount = divs[i].querySelector('span').innerText
  //   console.log('inforloop', parseInt(spanAmount))
  //   if (parseInt(spanAmount) > numberInput){
  //     div.remove()
  //   console.log(divs)
  //   }
  // } 
}