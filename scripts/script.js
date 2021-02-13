// Script.js

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

var cartIcon = document.createElement("img");
cartIcon.src = "./assets/cart-icon.png";
document.getElementById("cart-icon").appendChild(cartIcon);

var shopIcon = document.createElement("img");
cartIcon.src = "./assets/shop-icon.png";
document.getElementById("shop-icon").appendChild(shopIcon);