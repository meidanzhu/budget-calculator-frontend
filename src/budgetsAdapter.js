class BudgetsAdapter{ 
    constructor() {
        this.baseUrl = 'http://localhost:3000/budgets'
    }
    // INDEX
    fetchBudgets(){
        fetch(this.baseUrl)
        .then(res => res.json())
        .then(json => {
            json.data.forEach((el)=>{
               new Budget(el.attributes)
            })
        })
    }

    sendPatchRequest(budgetId){
        const amount = document.getElementById(`update-amount-${budgetId}`).value
        const description = document.getElementById(`update-description-${budgetId}`).value
    
        let budgetObj = {
            amount,
            description
        }
    
        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(budgetObj)
        }
    
        fetch(`http://localhost:3000/budgets/${budgetId}`, configObj)
        .then(res => res.json())
        .then(response => {
            let budget = Budget.all.find((i) => i.id === response.data.attributes.id )
            budget.updateBudgetOnDom(response.data.attributes)

        })
        let form = document.getElementById(`update-form-${budgetId}`)
    }

    deleteBudget(id){
        let configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }
    
        fetch(`http://localhost:3000/budgets/${id}`, configObj)
        .then(res => res.json())
        .then(json => {
            alert(json.message)
        })
    }
    //CREATE
    createBudget(e){
        e.preventDefault()

        const amount = document.getElementById("budget-amount").value
        const description = document.getElementById("budget-description").value

        let newBudgetObj = {
            amount: amount,
            description: description
        }

        let configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newBudgetObj)
        }

        fetch('http://localhost:3000/budgets', configObj)
        .then(resp => resp.json())
        .then(res => {
        let budget = new Budget(res.data.attributes)
        budget.attachToDom()
    })  

        budgetForm.reset()

    }
}