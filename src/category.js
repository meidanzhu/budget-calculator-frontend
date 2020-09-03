class Category{
    static all = []

    constructor({id,name}){
        this.id = id
        this.name = name
        this.element = document.createElement('li')
        this.element.id = `category-${id}`
        this.categoryList = document.getElementById('category-list')

        Category.all.push(this)
    }

    fullRender(){
        this.element.innerHTML = `
            <h3>${this.name}</h3>
        `
        return this.element
    }
    
    budgets(){
        return Budget.all.filter((budget) => budget.category_id == this.id)
    }

    attachToDom(){
        this.categoryList.append(this.fullRender())
        this.addEventListeners()
    }
    addEventListeners(){
        this.element.addEventListener('click', this.displayItems)

    }
    displayItems = () => {
        const sortBtn = document.getElementById('sort-btn')
        sortBtn.addEventListener('click', this.displaySortedItems)

        document.getElementById('list').innerHTML =``
        this.budgets().forEach((d)=>{
            d.attachToDom()
        })
    }

    displaySortedItems = () => {
        document.getElementById('list').innerHTML =``
        this.budgets().sort((a,b) => (a.amount - b.amount)).forEach((d)=>{
            d.attachToDom()
        })
    }

    
}