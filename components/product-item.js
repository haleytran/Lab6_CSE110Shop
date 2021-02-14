// product-item.js
var i = 0;

class ProductItem extends HTMLElement {
  // TODO
  constructor() {
    super();

    var shadow = this.attachShadow({mode:'open'});

    var list = document.createElement("li");
    list.setAttribute("class", "product");

    var info = localStorage.getItem("item " + `${i}`);
    var parse = JSON.parse(info);

    var imgSrc = parse.image;
    var imgAlt = parse.title;
    var image = document.createElement("img");
    image.src = imgSrc;
    image.alt = imgAlt;
    image.style.maxWidth = "200px";
    image.style.maxHeight = "285px";

    var p1 = document.createElement("p");
    p1.setAttribute("class", "title");
    var text1 = document.createTextNode(imgAlt);
    p1.appendChild(text1);

    var p2 = document.createElement("p");
    p2.setAttribute("class", "price");
    var price = parse.price;
    var text2 = document.createTextNode(price);
    p2.appendChild(text2);

    var btn = document.createElement("button");
    btn.appendChild(document.createTextNode("Add to Cart"));
    btn.setAttribute("onclick", "alert('Added to Cart!')");
    btn.addEventListener("click", function() {
      var count = document.getElementById("cart-count");
      if (btn.textContent === "Add to Cart") {
        count.innerHTML = parseInt(count.textContent) + 1;
        btn.textContent = "Remove from Cart";
        updateCart(parse.id, true);
        alertUser(btn,false);
      } else {
        count.innerHTML = parseInt(count.textContent) - 1;
        btn.textContent = "Add to Cart";
        updateCart(parse.id, false);
        alertUser(btn,true);
      }
    });

    var style = document.createElement("style");
    style.textContent = `
      .price { 
        color: green; 
        font-size: 1.8em; 
        font-weight: bold; 
        margin: 0; 
      } 
    
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
    
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
    
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
    
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
    
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }`;

    shadow.appendChild(style);
    shadow.appendChild(list);
    list.appendChild(image);
    list.appendChild(p1);
    list.appendChild(p2);
    list.appendChild(btn);
    i++;
  }
}

customElements.define('product-item', ProductItem);

function alertUser(elem, bool) {
  if (bool) {
    elem.setAttribute("onclick","alert('Added to Cart!')");
  } else {
    elem.setAttribute("onclick","alert('Removed from Cart!')");
  }
}

function updateCart(itemId, bool) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (bool) {
    var obj = {};
    cart[itemId] = itemId;
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    var keys = Object.keys(cart);
    for (var i = 0; i < keys.length; i++) {
      if (cart[keys[i]] == itemId) {
        delete cart[keys[i]];
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }
}