// Script.js

localStorage.setItem("cart", getCart());
function getCart() {
  var cart = localStorage.getItem("cart");
  var count = document.getElementById("cart-count");
  if (cart === null || cart == "{}") {
    count.innerHTML = 0;
    return "{}";
  } else {

    count.innerHTML = Object.keys(JSON.parse(cart)).length;
    return cart;
  }
}

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



