let cart = JSON.parse(window.localStorage.getItem('cart'));
let cartTotal = 0;
let tax = 0;
let grandTotal = 0;

let user = JSON.parse(window.localStorage.getItem('user'));

if (user) {
    document.getElementById('name').innerHTML = user.name;
    document.getElementById('email').innerHTML = user.email;
    document.getElementById("address").innerHTML = user.address;
    document.getElementById('city').innerHTML = user.city;
    document.getElementById('province').innerHTML = user.province.split('-')[1];
} else {
    window.location.href = "index.html";
}

function generateCartItemHtml(item, i) {
    let itemHtml = `<div id="${i}" class="cart-item">
    <div class="item-in">
        <div class="item-details">
            <h2 class="name">
                ${item.name}
            </h2>
            <p class="size">Size: ${item.size}</p>
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
        window.location.href = 'shop.html'
    }
}

initializeCart();
window.print();
window.localStorage.removeItem('cart');
window.location.href = 'shop.html';