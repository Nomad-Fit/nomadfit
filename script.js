//toggle mobile navigation (if applicable)
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.close-btn');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const cartIcon = document.querySelector('.cart-icon');
const cart = document.querySelector('.cart');
const cartCloseBtn = document.querySelector('.cart-close-btn');
const cartCount = document.querySelector('.cart-count');
fetch('https://fakestoreapi.com/products?limit=6')
    .then(response => response.json())
    .then(data => {
        //handle add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                addToCart(productId);
            });
        });
    })
    .catch(error => console.error('Error fetching products:', error));
//update cart count or local storage
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cartItems.length;
}
function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cartItems.some(item => item.id === productId);
    if (!productExists) {
        const product = products.find(item => item.id === productId);
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();
    }
}
function toggleMobileNav() {
    mobileNav.classList.toggle('open');
    body.classList.toggle('no-scroll');
    overlay.classList.toggle('visible');
}
menuToggle.addEventListener('click', toggleMobileNav);
//filter dropdown behaviour
const filterDropdown = document.querySelector('.filter-dropdown');
const filterOptions = document.querySelectorAll('.filter-option');
const filterButton = document.querySelector('.filter-button');
filterButton.addEventListener('click', () => {
    filterDropdown.classList.toggle('show');
});

//add filtering logic
filterOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedOption = option.dataset.filter;
        filterProducts(selectedOption);
    });
});
//add sorting logic
const sortOptions = document.querySelectorAll('.sort-option');
sortOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedOption = option.dataset.sort;
        sortProducts(selectedOption);
    });
});
//toggle cart visibility
cartIcon.addEventListener('click', () => {
    cart.classList.toggle('open');
    body.classList.toggle('no-scroll');
});
//close cart
cartCloseBtn.addEventListener('click', () => {
    cart.classList.remove('open');
    body.classList.remove('no-scroll');
});

//email subscription form
const emailForm = document.querySelector('.email-form');
const emailInput = document.querySelector('.email-input');
const emailError = document.querySelector('.email-error');

