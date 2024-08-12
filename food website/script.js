const menu = document.querySelector(".bar");
const navbar = document.querySelector(".navbar");
menu.addEventListener('click', () => {
    console.log('clikced')
    navbar.classList.toggle('active')
})
//jab vo neeche scroll krega to apne app ye block hat jaye uske liye hai
if (navbar) {
    window.onscroll = () => {
        navbar.classList.remove('active')


        if (window.scrollY > 60) {
            document.querySelector("#scroll-top").classList.add('active');
        } else {
            document.querySelector("#scroll-top").classList.remove('active');
        }
    }
}

function loader() {
    const loaderElement = document.querySelector('.loader');
    if (loaderElement) {
        loaderElement.classList.add('fade-out');
    }

}
function fadeout() {
    setInterval(loader, 2000)
}
fadeout();
// card section
console.log("started");
const content = document.querySelector('.site');

const cart = document.querySelector('.card')
const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.boxContainer');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total')
const quantity = document.querySelector('.quantity');
const close = document.querySelector('.close');
console.log(listCard)
console.log(quantity);
console.log(content)
console.log(closeShopping)
let product = [
    {
        id: 1,
        name: "Burger",
        image: "burger1.webp",
        price: 150
    },
    {
        id: 2,
        name: "CupCake",
        image: "cupcakes.jpg",
        price: 250
    },
    {
        id: 4,
        name: "Thali",
        image: "thali.jpg",
        price: 100
    },
    {
        id: 3,
        name: "Sandwich",
        image: "sandwich.jpg",
        price: 200
    },
    {
        id: 5,
        name: "Biryani",
        image: "biryani.jpg",
        price: 220
    },
    {
        id: 6,
        name: "Pasta",
        image: "sandwich.jpg",
        price: 180
    }
]
// // Add an event listener for the popstate event
// window.addEventListener('popstate', () => {
//     // Load the content of the previous page
//     loadPage(document.location.href);
// });
// if (openShopping) {
//     openShopping.addEventListener('click', (e) => {
//         e.preventDefault(); // Prevent default behavior
//         console.log("Open shopping clicked");
//         const buttonIds = Array.from(buttons).map(button => button.id);
//         localStorage.setItem('buttonIds', JSON.stringify(buttonIds));
//         localStorage.setItem('products', JSON.stringify(listCardElement))
//         history.pushState({}, '', 'cart.html');
//         loadPage('cart.html');
//     })
// }
// function loadPage(url) {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             document.body.innerHTML = xhr.responseText;
//         }
//     };
//     xhr.send();
// }
// if (close) {
//     close.addEventListener('click', (e) => {
//         e.preventDefault(); // Prevent default behavior
//         console.log("close shopping clicked");
//         history.back();
//     })
// }
openShopping.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Open shopping clicked");
    content.classList.add('display');
    cart.classList.remove('display')
    // disableScroll();

});
console.log("sdjbf")
closeShopping.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Close shopping clicked");
    content.classList.remove('display');
    cart.classList.add('display')
    // enableScroll();
});
// function disableScroll() {
//     document.addEventListener('wheel', preventDefault, { passive: false });
//     document.addEventListener('touchmove', preventDefault, { passive: false });
//     document.addEventListener('keydown', preventDefaultForScrollKeys);
// }

// function enableScroll() {
//     document.removeEventListener('wheel', preventDefault, { passive: false });
//     document.removeEventListener('touchmove', preventDefault, { passive: false });
//     document.removeEventListener('keydown', preventDefaultForScrollKeys);
// }


let listCardElement = [];
const buttons = document.querySelectorAll('.item');
console.log(buttons)
console.log("Hi")
if (buttons) {
    buttons.forEach(button => {
        // Add event listener to each button
        button.addEventListener('click', () => {
            console.log("Hi");
            const productId = parseInt(button.id);
            const productToAdd = product.find(prod => prod.id === productId);
            addToCart(productToAdd);
        });
    });
}
// ye sab agar ussi page pe akrna ho to 
// openShopping.addEventListener('click' ,()=>{
//     body.classList.add('active')
// })
// closeShopping.addEventListener('click' ,()=>{
//     body.classList.remove('active')
// })

// function initApp(){
//     product.forEach((value ,key)=>{
//         let newDiv = document.createElement('div')
//         newDiv.innerHTML=` <img src="${value.image}" />


//         `;
//         list.appendChild(newDiv)
//     })
// }
// initApp();

// ye jab tumhe alah page pe dalana hai 
function addToCart(product) {
    const existingProduct = listCardElement.find(item => item.id === product.id);

    if (!existingProduct) {
        // If the product doesn't exist in the cart, add it
        listCardElement.push({ ...product, quantity: 1 });
        console.log(listCardElement);
    } else {
        // If the product already exists in the cart, increase its quantity
        existingProduct.quantity++;
        console.log(listCardElement);
    }

    reloadCart();
}
function reloadCart() {
    listCard.innerHTML = ``;
    let count = 0;
    let totalPrice = 0;
     console.log("reoad1")
    listCardElement.forEach((product,key) => {
        totalPrice += product.price * product.quantity;
        count += product.quantity;
        if(product !=null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML=`
             <div><img src="${product.image}"/></div>
             <div style:"color:black">${product.name}</div>
             <div>${product.price.toLocaleString()}</div>
             <div>
               <button onclick="changeQuantity(${key},${product.quantity-1})">-</button>
               <div class="count">${product.quantity}</div>
               <button onclick="changeQuantity(${key},${product.quantity+1})">+</button>
             </div>
            `
            console.log(newDiv)
            listCard.appendChild(newDiv)
        }
    });
    console.log("reload")
    total.innerHTML = totalPrice.toLocaleString();
    quantity.innerHTML = count;
}


function changeQuantity(key , qua){
    console.log("called")
  if(qua == 0){
    listCardElement.splice(key, 1);
  }else{
    listCardElement[key].quantity = qua;
    listCardElement[key].price = qua*product[key].price;
  }
  reloadCart();
}
