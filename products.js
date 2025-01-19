
const Products = [
    {id:1, name:'BMW M3 GTR', price:45900},
    {id:2, name:'Porsche 718 Cayman GT4 RS', price:45600},
    {id:3, name:' MINI Countryman SE', price:45200},
];
let cart = [];

const productsListElement = document.getElementById('products-list');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

function init() {
    renderProducts();
    renderCart();
}

function renderProducts() {
    productsListElement.innerHTML = Products.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        
        return `
            <div class="product-item">
                <span>${product.name}</span>
                <span>${product.price}</span>
                <div class="quantity-controls">
                    <button onclick="updateCart(${product.id}, -1)" class="remove">-</button>
                    <span class="quantity">${quantity}</span>
                    <button onclick="updateCart(${product.id}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<div class="empty-cart">No Product added to the cart</div>';
        cartTotalElement.innerHTML = '';
        return;
    }
    
    cartItemsElement.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>${item.quantity} × ${item.price}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    cartTotalElement.innerHTML = `<div>Total: ${total}</div>`;
}

document.addEventListener('DOMContentLoaded', init);

function updateCart(productId, change) {
    const product = Products.find(p => p.id === productId);
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    
    if (cartItemIndex > -1) {
        const newQuantity = cart[cartItemIndex].quantity + change;
        if (newQuantity > 0) {
            cart[cartItemIndex].quantity = newQuantity;
        } else {
            cart.splice(cartItemIndex, 1);
        }
    } else if (change > 0) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    renderProducts();
    renderCart();
}

