const itemForm = document.getElementById('item-form')
const itemsAdapter = new ItemsAdapter
const categoriesAdapter = new CategoriesAdapter
const newFormButton = document.getElementById('new-form-btn')
const itemList = document.getElementById('item-list')
const searchBar = document.getElementById('searchBar')
let filteredItems = []

function hideBtnLoadForm(e){
    e.target.hidden = true
    const newForm = document.getElementById('new-form-container')
    newForm.hidden = false
}

document.addEventListener('DOMContentLoaded', () => {
    itemsAdapter.fetchItems()
    //console.log(filteredItems)
    categoriesAdapter.fetchCategories()
    itemForm.addEventListener('submit', itemsAdapter.handleFormSubmit)
    newFormButton.addEventListener('click', hideBtnLoadForm)
  
})


// create a search bar filtering through the name of the drinks
// in the index.html create the button and the form
// grab the element and add an event listener 
// create the function to filter/sort the data - manipulating the data
// add the input/result on the dom - update the DOM

//google each synx along the way.

// CREATE THE SEARCH FORM 
const createSearchForm = () => {
  const body = document.body
    body.innerHTML +=
  `   
    <div id=”search-form”>
    <input type=”text” id=”search” placeholder="Search Drink">
    <button id="searchBtn">Search</button>
</div>`
    
// GRAB THE BUTTON AND APPLY IT TO AN EVENT LISTENER
let searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener("click", processSearch)
}

//GET THE VALUE OF THE INPUT
const processSearch = () => {
  document.body.innerHTML += ""
  let query = document.getElementById('search').value

//MAKE A FETCH REQUEST TO GET AND POST THE INPUT
  fetch(`http://127.0.0.1:3000/items/search/${query}`)
  .then(resp => resp.json())
  .then(item => {
    const div = ""
    document.body.innerHTML +=

    `<div id="searchResult">${item.name}</div>`
  })
//ERROR MESSAGE
  .catch(error => {
    const msg = {message: "Could not find search"}
    document.body.innerHTML += `${msg.message}`
  })
}


//OPTION 2

searchBar.addEventListener('keyup', (e) =>{
  const searchString = e.target.value.toLowerCase();
  const filtered = filteredItems.filter(item => item.name.toLowerCase().includes(searchString));
  displayItems(filtered)
})

const displayItems = (items) => {
  const htmlString = items.map((item) => {
    return  `
    <li class='item'>
    $<span class="price">${item.price}</span>
    <strong class="name">${item.name}</strong>:
    <span class="description">${item.description}</span>
    </li>
    `;
  })
  .join('');
  itemList.innerHTML = htmlString;
}



// function itemSearch() {
//   let searchBar = document.getElementById('searchBar')
//   let itemsArray = Array.from(Item.all)

//   searchBar.addEventListener('click', (e) => {
//       let search = e.target.value.toLowerCase()
//       let filteredItems = itemsArray.filter((itemName) => {
//           return (
//               itemName.name.toLowerCase().includes(search)
//           )
//       })
//       removeItems(itemAdapter)
//       filteredItems.forEach((item) => {
//           item.attachToDom()
//       })
//   })
// }

// let filterDivs = divs.filter(element => (element.querySelector('strong').innerText).toLowerCase)
// filterDivs.forEach(element => element.remove())
