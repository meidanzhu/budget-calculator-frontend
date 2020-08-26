//document.addEventListener('DOMContentLoaded', ()=> alert('hi'))
expenseList = document.getElementById('expense-list')

function fetchExpenses(){
    fetch('http://127.0.0.1:3000/expenses')
    .then(res => res.json())
    .then(addExpensesToDom)
}

function addExpensesToDom(response){
    debugger
    response.data.forEach( item => {
        addItemToDom(item)
         })
}

fetchExpenses()
