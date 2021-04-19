class Category{

    static all = []

    constructor({id, name}){
        this.id = id
        this.name = name 
        this.element = document.createElement('li')
        this.element.id = `category-${id}`
        this.categoryList = document.getElementById('category-list')
        this.sorted = false

        Category.all.push(this)
    }

    attachToDom(){
        this.categoryList.append(this.fullRender())
        this.addEventListeners()
    }

    addEventListeners(){
        this.element.addEventListener('click', this.displayItems)
    }
    
    fullRender(){
        this.element.innerHTML = `
        <h3>${this.name}</h3>
        `
        return this.element
    }
    
    get items(){
        return Item.all.filter(i => i.category_id == this.id)
    }

    static find(id){
        return Category.all.find(c => c.id == id)
    }
    
    sortedItems(){
        return this.items.sort((a,b) => a.price - b.price)
    }

    // arrow function important
    displayItems = (e) => {
        
        const catList = document.getElementById('category-list')
        const itemList = document.getElementById('item-list')

        // =================STYLING======================//
        let cats = catList.querySelectorAll('li h3')
        cats.forEach(cat => {
            cat.style.color = "black"
        })
        e.target.style.color = "red"
        // =================END STYLING======================//

        itemList.innerHTML = ""
        this.items.forEach(i => {
            i.attachToDom()
        })

        let seeAllBtn = document.getElementById("all-btn")
        if (!seeAllBtn){
            seeAllBtn = document.createElement('button')
            seeAllBtn.id = "all-btn"
            seeAllBtn.innerText = "See all Items"
            this.categoryList.append(seeAllBtn)
        }else{
            seeAllBtn = document.getElementById("all-btn")
        }
        seeAllBtn.addEventListener("click", this.reset)
    }
    // important arrow function
    reset = () => {
        let catEl = document.getElementById(`category-${this.id}`)
        catEl.children[0].style.color = "black"
        Item.resetAllItems()
    }
}