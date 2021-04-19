class ItemsAdapter{ 
    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000/items'
    }
    
    fetchItems(){
        fetch(this.baseUrl)
        .then(res => res.json())
        .then(response => {
            response.data.forEach(el => {
                // let item = new Item(el.attributes.name, el.attributes.description, el.attributes.price))
                let item = new Item(el.attributes)
                item.attachToDom(el)
            })

        })
    }
    
    sendPatchRequest(itemId){
        const name = document.getElementById(`update-name-${itemId}`).value
        const price = document.getElementById(`update-price-${itemId}`).value
        const description = document.getElementById(`update-description-${itemId}`).value

        let itemObj = {
            name, 
            description,
            price
        }

        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(itemObj)
        }

        fetch(this.baseUrl + `/${itemId}`, configObj)
        .then(res => res.json())
        .then(response => {
            let item = Item.all.find(i => i.id == response.data.attributes.id)
            item.updateItemOnDom(response.data.attributes)
        })
        // remove form

        let form = document.getElementById(`update-form-${itemId}`)
        form.remove()
    }

    deleteItem(id){
        // remove from db
        let configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }

        fetch(this.baseUrl + `/${id}`, configObj)
        .then(res => res.json())
        .then(json => {
            alert(json.message)
        })
        //remove from front end array
        Item.all = Item.all.filter(i => i.id != id)

        // remove from dom
        let item = document.getElementById(`item-${id}`)
        item.remove()
    }
    // importance of arrw function
    handleFormSubmit = (e) => {
        e.preventDefault()
        const price = document.getElementById('item-price').value
        const description = document.getElementById('item-description').value
        const name = document.getElementById('item-name').value
        const category_id = document.getElementById('category').value

        let newItemObj = {
            name,
            description,
            price,
            category_id
        }

        let configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newItemObj)
        }

        fetch(this.baseUrl, configObj)
        .then(res => res.json())
        .then(json => {
            let item = new Item(json.data.attributes)
            item.attachToDom()
        })

        itemForm.reset()
        const newFormButton = document.getElementById('new-form-btn')        
        const formContainer = document.getElementById('new-form-container')
        formContainer.hidden = true
        newFormButton.hidden = false
        newFormButton.addEventListener('click', hideBtnLoadForm)

    }
}
    