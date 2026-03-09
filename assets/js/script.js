'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}
function sendData(productBox){

  const product = {
    img: productBox.querySelector("img").src,
    name: productBox.querySelector(".showcase-title").innerText,
    price: productBox.querySelector(".price").innerText
  };

  localStorage.setItem("product", JSON.stringify(product));

  window.location.href = "productdetails.html";
}

function cart(){
  let product = JSON.parse(localStorage.getItem("product"));
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.push(product);

  localStorage.setItem("cart", JSON.stringify(cartItems));
  alert("Added to Cart");
}
function viewProduct(product){
  localStorage.setItem("product", JSON.stringify(product));
  window.location.href = "productdetails.html";
}function loadAdminProducts(){

let products = JSON.parse(localStorage.getItem("products")) || [];

let container = document.getElementById("adminProductContainer");

if(!container) return;

container.innerHTML = "";

products.forEach((item,index)=>{

container.innerHTML += `
<div class="showcase">

<div class="showcase-banner">
<img src="${item.img}" width="170" height="100" class="showcase-img">
</div>

<div class="showcase-content">

<h4 class="showcase-title">${item.name}</h4>

<div class="price-box">
<p class="price">₹${item.price}</p>
</div>

<button onclick="addToCart(${index})">Add to Cart</button>

</div>

</div>
`;

});

}

function addToCart(i){

let products = JSON.parse(localStorage.getItem("adminProducts"));
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push(products[i]);

localStorage.setItem("cart", JSON.stringify(cart));

alert("Product added to cart");

}

document.addEventListener("DOMContentLoaded", loadAdminProducts);