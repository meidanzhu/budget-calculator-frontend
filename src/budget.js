class Budget {

    static all = []

    constructor({id, amount, description, category_id}){
        this.id = id,
        this.amount = amount,
        this.description = description
        this.category_id = category_id

        this.element = document.createElement('div')
        this.element.id = `budget-${this.id}`

        Budget.all.push(this)
    }

    get category(){
        return Category.all.find((cat) => cat.id == this.category_id)
    }
    
    get budgetList(){
        return  document.getElementById('list')
     }

    addEventListeners(){
        this.element.addEventListener('click', this.handleListClick)
    }

    static findById(id){
        return Budget.all.find((budget) => budget.id == id)
    }

     handleListClick = (e) => {

        if (e.target.className === "delete"){
            let id = e.target.dataset.id
             budgetsAdapter.deleteBudget(id)
             this.element.remove() 
        } else if(e.target.className === 'update'){
             let budgetId = e.target.dataset.id
             e.target.className = "save"
             e.target.innerText = "Save"
             this.addUpdateBudgetFields(budgetId)
         } else if(e.target.className === 'save'){
             let budgetId = e.target.dataset.id
             e.target.className = "update"
             e.target.innerText = "Update"
             budgetsAdapter.sendPatchRequest(budgetId)
         }
    }

    attachToDom(){
        this.budgetList.append(this.fullRender())
        this.addEventListeners()
    }

    fullRender(){

        this.element.innerHTML =
        `
        <li>
        $<span class="amount">${this.amount}</span>
        <span class="description">${this.description}</span>
        </li>
        <button class="delete" data-id="${this.id}">Delete</button>
        <button class="update" data-id="${this.id}">Update</button>
        `
        return this.element
    }

    updateBudgetOnDom({amount,description}){
        // let liItem = document.querySelector(`#item-${item.id} li`)
        this.amount = amount
        this.description = description
        this.fullRender()
    }

    addUpdateBudgetFields(budgetId){
        let budget = Budget.findById(budgetId)
    
        let updateForm = `
        <input type="number" value="${this.amount}" name="amount" id="update-amount-${budgetId}" min="0" step=".01">
        <input type="text" name="description" value="${this.description}" id="update-description-${budgetId}">
        `
    
        let formDiv = document.createElement('div')
        formDiv.id = `update-form-${budgetId}`
        formDiv.innerHTML = updateForm
        budget.element.querySelector('li').append(formDiv)
    }
}