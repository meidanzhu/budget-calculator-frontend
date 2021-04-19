class Item{
    static all = []

    constructor({name, description, price, id, category_id}){
        this.name = name
        this.description = description 
        this.price = price
        this.id = id
        this.category_id = category_id
        this.element = document.createElement('div')
        this.element.id = `item-${this.id}`
        // this.itemList = document.getElementById('item-list')
        // this.element.addEventListener('click', this.handleListClick)

        Item.all.push(this)
    }

    get itemList(){
        return document.getElementById('item-list')
    }

    static findById(id){
        return Item.all.find(item => item.id == id)
    }

    addEventListeners(){
        this.element.addEventListener('click', this.handleListClick)
    }

    attachToDom(){
        this.itemList.append(this.fullRender())
        this.addEventListeners()
    }
    
    fullRender(){
        this.element.innerHTML = `
        <li>
        $<span class="price">${this.price}</span>
        <strong class="name">${this.name}</strong>:
        <span class="description">${this.description}</span>
        </li>
        <button class="delete" data-id="${this.id}">Delete</button>
        <button class="update" data-id="${this.id}">Update</button>
        `
        return this.element
    }

    updateItemOnDom({price, name, description}){
        this.price = price
        this.description = description
        this.name = name 
        this.fullRender()
        this.addEventListeners()
    }

    static resetAllItems(){
        Item.all.forEach(el => el.attachToDom())
        document.getElementById("all-btn").remove()
    }

    addUpdateItemFields(itemId){
        let item = document.querySelector(`#item-${itemId} li`)
        let updateForm = `
        <input type="number" value="${this.price}" name="price" id="update-price-${itemId}" min="0" step=".01">
        <input type="text" name="name" value="${this.name}" id="update-name-${itemId}">
        <input type="text" name="description" value="${this.description}" id="update-description-${itemId}">
        `
        let formDiv = document.createElement('div')
        formDiv.id = `update-form-${itemId}`
        formDiv.innerHTML = updateForm
        item.append(formDiv)
    }
    
    handleListClick = (e) => {
        let id = e.target.dataset.id
        if (e.target.className === "delete"){
             itemsAdapter.deleteItem(id)
        } else if(e.target.className === 'update'){
             e.target.className = "save"
             e.target.innerText = "Save"
             this.addUpdateItemFields(id)
         } else if(e.target.className === 'save'){
             e.target.className = "update"
             e.target.innerText = "Update"
             itemsAdapter.sendPatchRequest(id)
         }
        
    }
}


//     updateItemOnDom({price, name, description}){
//         this.price = price
//         this.description = description
//         this.name = name 
//         this.fullRender()
//         this.addEventListeners()
//     }

//     static resetAllItems(){
//         Item.all.forEach(el => el.attachToDom())
//         document.getElementById("all-btn").remove()
//     }

//     addUpdateItemFields(itemId){
//         let item = document.querySelector(`#item-${itemId} li`)
//         let updateForm = `
//         <input type="number" value="${this.price}" name="price" id="update-price-${itemId}" min="0" step=".01">
//         <input type="text" name="name" value="${this.name}" id="update-name-${itemId}">
//         <input type="text" name="description" value="${this.description}" id="update-description-${itemId}">
//         `
//         let formDiv = document.createElement('div')
//         formDiv.id = `update-form-${itemId}`
//         formDiv.innerHTML = updateForm
//         item.append(formDiv)
//     }
    
//     handleListClick = (e) => {
//         let id = e.target.dataset.id
//         if (e.target.className === "delete"){
//              itemsAdapter.deleteItem(id)
//         } else if(e.target.className === 'update'){
//              e.target.className = "save"
//              e.target.innerText = "Save"
//              this.addUpdateItemFields(id)
//          } else if(e.target.className === 'save'){
//              e.target.className = "update"
//              e.target.innerText = "Update"
//              itemsAdapter.sendPatchRequest(id)
//          }
//     }

