let cart = JSON.parse(window.localStorage.getItem('cart'));
let cartTotal = 0;
let tax = 0;
let grandTotal = 0;

let user = JSON.parse(window.localStorage.getItem('user'));

if (user) {
    document.getElementById('username').innerHTML = user.name;
} else {
    window.location.href = "index.html";
}

function generateCartItemHtml(item, i) {
    let itemHtml = `<div id="${i}" class="cart-item">
    <div class="item-in">
        <div class="item-img">
            <img src="${item.img}">
        </div>
        <div class="item-details">
            <h2 class="name">
                ${item.name}
            </h2>
            <p class="size">Size: ${item.size}</p>
            <button id="btn-${i}" class="btn-remove" onclick="removeFromCart(this.id)">Remove</button>
        </div>
    </div>
    <div class="amt">$${item.price}</div>
</div>`;
    return itemHtml;
}

function initializeCart() {
    cartTotal = 0;
    if (cart && cart.length > 0) {
        let cartHtml = '';
        cart.forEach((item, i) => {
            cartHtml = cartHtml.concat(generateCartItemHtml(item, i));
            cartTotal += item.price;
            if (i == cart.length - 1) {
                document.getElementById('cart-list').innerHTML = cartHtml;
                document.getElementById('cart-total').innerHTML = `$${cartTotal}`;
                document.getElementById('cart-val').innerHTML = cart.length > 0 ? `(${cart.length})` : '';
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4){
                        tax = JSON.parse(xhr.responseText).pst * cartTotal;
                        grandTotal = cartTotal + tax;
                    }
                    document.getElementById('tax').innerHTML = `$${tax}`;
                    document.getElementById('grand-total').innerHTML = `$${grandTotal}`;
                };
                xhr.open('GET', `https://api.salestaxapi.ca/v2/province/${user.province.split('-')[0]}`);
                xhr.send();
            }
        });


    } else {
        document.getElementById('cart-list').innerHTML = '<h3>Nothing in your cart yet!</h3>';
        document.getElementById('cart-total').innerHTML = `$${cartTotal}`;
        document.getElementById('cart-val').innerHTML = '';
    }
}

function removeFromCart(id) {
    let cartItemId = id.split('-')[1];
    cart.splice(cartItemId, 1);
    window.localStorage.setItem('cart', JSON.stringify(cart));
    initializeCart();
}

function checkout() {
    if (cartTotal < 10) {
        document.getElementById('err-msg').innerHTML = 'Your minimum purchase should be wroth $10';
    } else {
        window.location.href = "invoice.html";
    }
}

initializeCart();

