/* =========================
   PRODUCTS ARRAY
========================= */
let originalProducts = [
{
name: "Beef Burgers",
price: "From R36",
image: "images/beef-burger.jpg",
link: "beef.html"
},
{
name: "Chicken Burgers",
price: "From R25",
image: "images/chicken-burger.jpg",
link: "chicken.html"
},
{
name: "Desserts",
price: "Sweet Treats",
image: "images/dessert.jpg",
link: "dessert.html"
},
{
name: "Cold Drinks",
price: "Refreshing",
image: "images/cold-beverages.jpg",
link: "drinks.html"
}
];
let products = [...originalProducts];
/* =========================
   LOAD PRODUCTS
========================= */
const productGrid =
document.getElementById("productGrid");
function loadProducts(){
if(!productGrid) return;
productGrid.innerHTML = "";
products.forEach(function(product){
productGrid.innerHTML +=
`
<a class="card" href="${product.link}">
<img
src="${product.image}"
alt="${product.name}"
class="gallery"
loading="lazy">
<h3>${product.name}</h3>
<p>${product.price}</p>
</a>
`;
});
revealCards();
}
loadProducts();
/* =========================
   SEARCH FILTER
========================= */
const searchInput =
document.getElementById("searchInput");
if(searchInput){
searchInput.addEventListener(
"keyup",
function(){
const filter =
this.value.toLowerCase();
const cards =
document.querySelectorAll(".card");
cards.forEach(function(card){
const text =
card.textContent.toLowerCase();
if(text.includes(filter)){
card.style.display = "";
}
else{
card.style.display = "none";
}
});
});
}
/* =========================
   SORT PRODUCTS
========================= */
const sortProducts =
document.getElementById("sortProducts");
if(sortProducts){
sortProducts.addEventListener(
"change",
function(){
if(this.value === "az"){
products.sort(
(a,b)=>
a.name.localeCompare(b.name)
);
}
else if(this.value === "za"){
products.sort(
(a,b)=>
b.name.localeCompare(a.name)
);
}
else{
products =
[...originalProducts];
}
loadProducts();
});
}
/* =========================
   WELCOME MODAL
========================= */
const offerModal =
document.getElementById("offerModal");
const closeModal =
document.getElementById("closeModal");
window.addEventListener(
"load",
function(){
if(offerModal){
offerModal.style.display =
"block";
}
});
if(closeModal){
closeModal.addEventListener(
"click",
function(){
offerModal.style.display =
"none";
});
}
window.addEventListener(
"click",
function(event){
if(
offerModal &&
event.target === offerModal
){
offerModal.style.display =
"none";
}
});
/* =========================
   FAQ ACCORDION
========================= */
const accordions =
document.querySelectorAll(
".accordion"
);
accordions.forEach(function(item){
item.addEventListener(
"click",
function(){
this.classList.toggle(
"active"
);
const panel =
this.nextElementSibling;
if(
panel.style.display ===
"block"
){
panel.style.display =
"none";
}
else{
panel.style.display =
"block";
}
});
});
/* =========================
   LIGHTBOX GALLERY
========================= */
document.addEventListener(
"click",
function(e){
if(
e.target.classList.contains(
"gallery"
)
){
e.preventDefault();
const lightbox =
document.getElementById(
"lightbox"
);
const lightboxImage =
document.getElementById(
"lightboxImage"
);
if(
lightbox &&
lightboxImage
){
lightbox.style.display =
"flex";
lightboxImage.src =
e.target.src;
lightboxImage.alt =
e.target.alt;
}
}
});
const lightboxClose =
document.getElementById(
"lightboxClose"
);
if(lightboxClose){
lightboxClose.addEventListener(
"click",
function(){
const lightbox =
document.getElementById(
"lightbox"
);
if(lightbox){
lightbox.style.display =
"none";
}
});
}
/* =========================
   SCROLL REVEAL ANIMATION
========================= */
function revealCards(){
const cards =
document.querySelectorAll(
".card"
);
cards.forEach(function(card){
const position =
card.getBoundingClientRect()
.top;
const screen =
window.innerHeight;
if(position < screen - 100){
card.classList.add("show");
}
});
}
window.addEventListener(
"scroll",
revealCards
);
revealCards();
/* =========================
   CONTACT FORM VALIDATION
========================= */
const contactForm =
document.getElementById(
"contactForm"
);
if(contactForm){
contactForm.addEventListener(
"submit",
function(e){
e.preventDefault();
let name =
document.getElementById(
"name"
).value.trim();
let email =
document.getElementById(
"email"
).value.trim();
let phone =
document.getElementById(
"phone"
).value.trim();
let message =
document.getElementById(
"message"
).value.trim();
let errorMsg =
document.getElementById(
"errorMsg"
);
let successMsg =
document.getElementById(
"successMsg"
);
if(errorMsg){
errorMsg.textContent = "";
errorMsg.style.color = "red";
}
if(successMsg){
successMsg.textContent = "";
}
if(name.length < 3){
errorMsg.textContent =
"Name must be at least 3 characters.";
return;
}
const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(email)){
errorMsg.textContent =
"Please enter a valid email address.";
return;
}
if(phone !== ""){
const phoneRegex =
/^[0-9]{10,15}$/;
if(!phoneRegex.test(phone)){
errorMsg.textContent =
"Phone number must contain 10 to 15 digits.";
return;
}
}
if(message.length < 10){
errorMsg.textContent =
"Message must contain at least 10 characters.";
return;
}
/* =========================
   AJAX DEMONSTRATION
========================= */
fetch(
contactForm.action || "#",
{
method: "POST",
body: new FormData(contactForm)
}
)
.then(function(){
if(successMsg){
successMsg.textContent =
"Thank you! Your message has been sent successfully.";
}
contactForm.reset();
})
.catch(function(){
if(errorMsg){
errorMsg.textContent =
"Unable to submit form. Please try again.";
}
});
});
}