//retrieve data from localStorage
let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shop-cart");

let basket = JSON.parse (localStorage.getItem ("data")) || [];

console.log (basket);

let shopItemsData = [{
  id: 'item1',
  name: 'Adorable Pug',
  price: 12.99,
  desc: 'print 150x200',
  img: './images/pet_pug_print.jpg'
}, 

{
  id: 'item2',
  name: 'Marine Turtle',
  price: 12.99,
  desc: 'print 120x200',
  img: './images/turtle-image-cropped.jpg'

},

{
  id: 'item3',
  name: 'Pink Moutain',
  price: 12.99,
  desc: 'print 200x120',
  img: './images/pink-mountains-image.jpg'

}, 

{
  id: 'item4',
  name: 'Colibri Bird',
  price: 12.99,
  desc: 'print 200x300',
  img: './images/bird-image.jpg'

}, 
{
  id: 'item5',
  name: 'Mountain River',
  price: 17.99,
  desc: 'print 400x300',
  img: './images/river-image.jpg'

},

{
  id: 'item6',
  name: 'Sea Lion',
  price: 15.99,
  desc: 'print 200x300',
  img: './images/sealioncropped.jpg'

},

{
  id: 'item7',
  name: 'Volcano',
  price: 16.99,
  desc: 'print 200x450',
  img: './images/volcano.jpeg'

},

{
  id: 'item8',
  name: 'Squirrel on Tree',
  price: 12.99,
  desc: 'print 200x300',
  img: './images/squirrel.jpeg'

}]

//to add the number to the cart icon

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  
  calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
      return (ShoppingCart.innerHTML = basket
        .map((x) => {
          let { id, item } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
          return `
        <div class="cart-item">
          <img width="300" src=${search.img} alt="" />
          <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                  <p>${search.name}</p>
                  <p class="cart-item-price"> £ ${search.price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>£ ${Math.floor((item * search.price)*100)/100}</h3>
          </div>
        </div>
        `;
        })
        .join(""));
    } else {
      ShoppingCart.innerHTML = ``;
      label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
      `;
    }
  };
  
  generateCartItems();
  
  let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
  
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
  };
  
  let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };
  
  let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { item, id } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
  
          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
      // console.log(amount);
      label.innerHTML = `
      <h2>Total Bill : £ ${Math.round(amount*100)/100}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    } else return;
  };
  
  TotalAmount();
