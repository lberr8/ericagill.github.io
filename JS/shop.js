// targets the html id=shop

let shop = document.getElementById ('shop');

// to remember the items selected
//let basket =[]; initially set without localStorage

let basket = JSON.parse(localStorage.getItem("data")) || [];

let shopItemsData = [{
  id: 'item1',
  name: 'Adorable Pug',
  price: 12.99,
  desc: 'print 150x200',
  img: './Images/pet_pug_print.jpg'
}, 

{
  id: 'item2',
  name: 'Marine Turtle',
  price: 12.99,
  desc: 'print 120x200',
  img: './Images/turtle-image-cropped.jpg'

},

{
  id: 'item3',
  name: 'Pink Moutain',
  price: 12.99,
  desc: 'print 200x120',
  img: './Images/pink-mountains-image.jpg'

}, 

{
  id: 'item4',
  name: 'Colibri Bird',
  price: 12.99,
  desc: 'print 200x300',
  img: './Images/bird-image.jpg'

}, 
{
  id: 'item5',
  name: 'Mountain River',
  price: 17.99,
  desc: 'print 400x300',
  img: './Images/river-image.jpg'

},

{
  id: 'item6',
  name: 'Sea Lion',
  price: 15.99,
  desc: 'print 200x300',
  img: './Images/sealioncropped.jpg'

},

{
  id: 'item7',
  name: 'Volcano',
  price: 16.99,
  desc: 'print 200x450',
  img: './Images/volcano.jpeg'

},

{
  id: 'item8',
  name: 'Squirrel on Tree',
  price: 12.99,
  desc: 'print 200x300',
  img: './Images/squirrel.jpeg'

}]

// function to generate a shop without copy/paste the HTML code

let generateShop = () => {
  //where we want to items to get printed.
  // map function targets data, each attribute of the object.

  return (shop.innerHTML = shopItemsData. map((x) => {
    let {id, name, price, desc, img } = x;
    let search = basket.find((x)=> x.id === id) || []

    return `  <div id=product-id-${x.id} class="item">
    <img src=${img} width="220" height ="150" >
    <div class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class= "price-quantity">
        <h2>£${price}</h2>
        <div class="buttons">
          <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
          <div id= ${id} class="quantity">${search.item === undefined? 0:search.item} </div>
          <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
  </div>`
  }). join ('')); //to remove the visual comma between items

};

generateShop();

//NOTE the following functions are linked to onclick= "functionName ()"
// to increment the quantity (innerText of the HTML class)

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  //to search for the item without duplicates

  if (search === undefined) {
  //if the items to add do not exist, we push them to the basket (defined ad empty array)
  basket.push({
    id: selectedItem.id,
    item: 1
  });
  } else {
    search.item += 1;
  }

  //add localStorage to save data after refresh 

  localStorage.setItem("data", JSON.stringify(basket));

  update(selectedItem.id);
};

// to decrement the quantity (innerText of the HTML class)

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  //add localStorage to save data after refresh 

  localStorage.setItem("data", JSON.stringify(basket));

  update (selectedItem.id); 
};

// to update the number when q.ty is incremented

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log (search.item)
  document.getElementById (id).innerHTML = search.item;
  calculation();
};

//to add the number to the cart icon

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
