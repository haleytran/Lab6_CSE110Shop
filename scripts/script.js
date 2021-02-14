// Script.js

// update value of cart after refresh
var cart = localStorage.getItem("cart"); 
localStorage.setItem("cart", getCart());
function getCart() {
  if (cart === null || cart == "{}") {
    var count = document.getElementById("cart-count");
    count.innerHTML = 0;
    return "{}";
  } else {
    var item = JSON.parse(cart);
    if (item !== null) {
      var keys = Object.keys(item);
      var count = document.getElementById("cart-count");
      count.innerHTML = keys.length;
    }
    return cart;
  }
}

// fetch data from link, store data into localStorage, and create product-item element for each item
window.addEventListener('DOMContentLoaded', () => {
  // TODO
  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => storeData(data));
});

function storeData (data) {
  var totalItems = data.length;
  for (var i = 0; i < totalItems; i++) {
    localStorage.setItem("item " + `${i}`, JSON.stringify(data[i]));
  }
  
  if (localStorage.getItem("item 1") != null) {  
    var i = 0;
    for (i; i < totalItems; i++) {
      var product = document.createElement("product-item");
      product.setAttribute("item", localStorage.getItem("item " + `${i}`)); 
      document.getElementById("product-list").appendChild(product);
    } 
  }
} 