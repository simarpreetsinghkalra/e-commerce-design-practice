let prods = [
    {
        id: 0,
        name: 'Pedigree Professional for Small Puppy Breeds',
        img: 'assets/img/pedigree1.png',
        description: 'Pedigree Professional Range puppy dog food fulfils the special needs of your dog.',
        size: '1Kg',
        price: 10,
    },
    {
        id: 1,
        name: 'Pedigree Professional Large Breed Puppy Food',
        img: 'assets/img/pedigree2.png',
        description: 'Pedigree Professional Range puppy dog food fulfils the special needs of your dog.',
        size: '2Kg',
        price: 15,
    },
    {
        id: 2,
        name: 'Pedigree Puppy Chicken and Milk',
        img: 'assets/img/pedigree3.png',
        description: 'PEDIGREE Chicken & Milk for Puppy is a wholesome meal, packed with essential nutrients vital to the healthy growth of your pet.',
        size: '500gm',
        price: 5,
    },
    {
        id: 3,
        name: 'Pedigree Gravy Puppy Chicken Chunks',
        img: 'assets/img/pedigree4.png',
        description: 'Pedigree Gravy puppy dog food is 100% complete and balanced. Easy to feed, it consists of high-quality ingredients, with the essential nutrition required to keep your pet happy and healthy.',
        size: '350gm',
        price: 5,
    },
    {
        id: 4,
        name: 'Pedigree Dry Puppy Meat and Milk',
        img: 'assets/img/pedigree5.png',
        description: 'PEDIGREE puppy food with Meat & Milk for Puppy is a wholesome meal, packed with essential nutrients vital to the healthy growth of your pet.',
        size: '500gm',
        price: 5,
    },
    {
        id: 5,
        name: 'Pedigree Professional Starter Mother and Pup',
        img: 'assets/img/pedigree6.png',
        description: 'Pedigree Professional Range dog food fulfills the special needs of your dog. The range provides expert nutrition combining high quality ingredients with the science developed by our veterinarians and nutritionists at WALTHAM- the world’s leading authority on pet care and nutrition.',
        size: '1Kg',
        price: 10,
    },
    {
        id: 6,
        name: 'Pedigree Pro Adult Weight Management',
        img: 'assets/img/pedigree7.png',
        description: 'Pedigree Pro is a Professional Range of dog food that fulfills the special needs of your dog. The range provides expert nutrition combining high-quality ingredients with the science developed by our veterinarians and nutritionists at WALTHAM- the world’s leading authority on pet care and nutrition.',
        size: '1Kg',
        price: 10,
    },
    {
        id: 7,
        name: 'Pedigree Dog Treats Adult Meat Jerky Roasted Lamb',
        img: 'assets/img/pedigree8.jpg',
        description: 'Share moments of happiness and joy with your dog with Pedigree Meat Jerky Roasted Lamb dog treats.',
        size: '500gm',
        price: 10,
    }
];

let cart = [];

let user = JSON.parse(window.localStorage.getItem('user'));

if (user) {
    document.getElementById('username').innerHTML = user.name;
} else {
    window.location.href = "index.html";
}

function initialiseApp() {
    prods.forEach(prod => {
        document.getElementById('prod-list').appendChild(generatePorduct(prod));
    });
    initCart();
}

function initCart() {
    let storedCart = window.localStorage.getItem('cart');
    if (storedCart && storedCart.length > 0) {
        cart = JSON.parse(storedCart) 
        document.getElementById('cart-val').innerHTML = cart.length > 0 ? `(${cart.length})` : '';
    }
}

function generatePorduct(prod) {
    let elem = document.createElement('div');
    elem.setAttribute('id', prod.id);
    elem.setAttribute('class', 'prod');
    elem.innerHTML = `<div class="prod-pic">
            <img src="${prod.img}" />
        </div>
        <div class="prod-name">
            <h2>${prod.name}</h2>
        </div>
        <div class="prod-desc">
            <p>
                ${prod.description}
            </p>
        </div>
        <div class="prod-btn-grp">
            <button id="${prod.id}" class="prod-btn btn-buy" onclick="addToCart(this.id)">Add to Cart</button>
            <button class="prod-btn btn-details">More Details</button>
        </div>`;
    return elem;
}

function addToCart(id) {
    cart.push(prods.find(prod => prod.id == id));
    window.localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-val').innerHTML = cart.length > 0 ? `(${cart.length})` : '';
}

initialiseApp();