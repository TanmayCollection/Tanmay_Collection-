const products = [
  {id:1,name:"Classic Handbag",cat:"Handbags",price:1499,img:"assets/brand-store.jpg"},
  {id:2,name:"Elegant Sling Bag",cat:"Sling Bags",price:999,img:"assets/brand-collage.jpg"},
  {id:3,name:"Premium Handbag",cat:"Handbags",price:1799,img:"assets/hero.png"},
  {id:4,name:"Party Clutch",cat:"Clutches",price:899,img:"assets/brand-collage.jpg"},
  {id:5,name:"Classic Wallet",cat:"Wallets",price:699,img:"assets/brand-store.jpg"},
  {id:6,name:"Travel Bag",cat:"Travel Bags",price:1599,img:"assets/hero.png"}
];
// These starter entries are clearly marked as demo catalog entries in code.
// Replace them with your actual products, prices and product photos before taking payments.
let activeCat="All", cart=[];

const grid=document.getElementById("productGrid"), empty=document.getElementById("empty");
function render(){
  const q=(document.getElementById("search").value||"").toLowerCase();
  const list=products.filter(p=>(activeCat==="All"||p.cat===activeCat)&&(`${p.name} ${p.cat}`.toLowerCase().includes(q)));
  grid.innerHTML=list.map(p=>`<article class="product">
    <img src="${p.img}" alt="${p.name}">
    <div class="product-body"><h3>${p.name}</h3><p>${p.cat}</p>
    <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
    <button class="add" onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join("");
  empty.hidden=list.length!==0;
}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...p,qty:1});updateCart();openCart()}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 const box=document.getElementById("cartItems");
 box.innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><img src="${x.img}" alt=""><div><b>${x.name}</b><br>₹${x.price.toLocaleString("en-IN")} × ${x.qty}</div><button onclick="removeCart(${x.id})">Remove</button></div>`).join(""):"<p>Your cart is empty.</p>";
 document.getElementById("cartTotal").textContent=cart.reduce((s,x)=>s+x.price*x.qty,0).toLocaleString("en-IN");
}
function removeCart(id){cart=cart.filter(x=>x.id!==id);updateCart()}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("open")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
document.querySelectorAll(".categories button").forEach(b=>b.addEventListener("click",()=>{activeCat=b.dataset.cat;document.querySelectorAll(".categories button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()}));
document.getElementById("search").addEventListener("input",render);
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkout").onclick=()=>{
 if(!cart.length){alert("Your cart is empty.");return}
 const lines=cart.map(x=>`${x.name} x${x.qty} - ₹${x.price*x.qty}`).join("%0A");
 const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
 window.open(`https://wa.me/918696999938?text=Hello%20Tanmay%20Collection,%20I%20want%20to%20order:%0A${lines}%0A%0ATotal:%20₹${total}`, "_blank");
};
render();updateCart();
