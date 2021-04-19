class CategoriesAdapter{
    constructor(){
        this.baseUrl = 'http://localhost:3000/categories'
    }

    fetchCategories(){
        fetch(this.baseUrl)
        .then(res => res.json())
        .then(response => {
            // console.log(response)
            response.data.forEach(el => {
                this.sanitizeAndInitializeCategory(el)
            })
        })
    }

    sanitizeAndInitializeCategory(data){
        let cat = new Category({id: data.id, ...data.attributes})
        cat.attachToDom()
    }
}
