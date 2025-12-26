/**
 * KIFARU COFFEE - JavaScript
 * Premium Kenyan Coffee & Tea E-commerce
 * 
 * Features:
 * - Shopping Cart with localStorage persistence
 * - Currency Conversion (KES, USD, EUR, GBP)
 * - Dark/Light Theme Toggle
 * - Dynamic Greeting based on time
 * - Product Filtering & Search
 * - Contact Form Validation
 */

// ========================================
// PRODUCTS DATA
// ========================================
const products = [
    {
        id: 1,
        name: "Mount Kenya AA",
        description: "Premium single-origin coffee with bright citrus notes and a smooth, wine-like finish.",
        price: 1500,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
        badge: "Best Seller",
        featured: true
    },
    {
        id: 2,
        name: "Nyeri Highlands Blend",
        description: "A rich, full-bodied blend with chocolate undertones and hints of blackberry.",
        price: 1350,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop",
        badge: null,
        featured: true
    },
    {
        id: 3,
        name: "Purple Tea - Rare",
        description: "Unique purple-leafed tea rich in antioxidants with a delicate, smooth flavor.",
        price: 1200,
        originalPrice: 1500,
        category: "tea",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
        badge: "20% OFF",
        featured: true
    },
    {
        id: 4,
        name: "Kiambu Estate Reserve",
        description: "Estate-grown coffee with caramel sweetness and a long, syrupy finish.",
        price: 1800,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop",
        badge: "Premium",
        featured: true
    },
    {
        id: 5,
        name: "Kenyan Breakfast Tea",
        description: "Bold and brisk black tea, perfect with milk. A morning essential.",
        price: 800,
        category: "tea",
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop",
        badge: null,
        featured: false
    },
    {
        id: 6,
        name: "Peaberry Special",
        description: "Rare peaberry beans with concentrated flavor - bright, complex, and memorable.",
        price: 2200,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop",
        badge: "Rare",
        featured: false
    },
    {
        id: 7,
        name: "Green Tea - Organic",
        description: "Light, refreshing organic green tea with natural grassy notes.",
        price: 950,
        category: "tea",
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=300&fit=crop",
        badge: "Organic",
        featured: false
    },
    {
        id: 8,
        name: "Espresso Roast",
        description: "Dark roast perfect for espresso - bold, smoky with a chocolate finish.",
        price: 1400,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
        badge: null,
        featured: false
    }
];

// ========================================
// CURRENCY CONVERSION
// ========================================
const currencyRates = {
    KES: 1,
    USD: 0.0065,
    EUR: 0.006,
    GBP: 0.0052
};

const currencySymbols = {
    KES: 'KES',
    USD: '$',
    EUR: '€',
    GBP: '£'
};

let currentCurrency = localStorage.getItem('currency') || 'KES';

function convertPrice(priceKES) {
    return priceKES * currencyRates[currentCurrency];
}

function formatPrice(priceKES) {
    const converted = convertPrice(priceKES);
    const symbol = currencySymbols[currentCurrency];
    
    if (currentCurrency === 'KES') {
        return `${symbol} ${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
}

function setCurrency(currency) {
    currentCurrency = currency;
    localStorage.setItem('currency', currency);
    updateAllPrices();
    updateCartDisplay();
}

function updateAllPrices() {
    // Update product prices on page
    document.querySelectorAll('[data-price]').forEach(el => {
        const price = parseFloat(el.dataset.price);
        el.textContent = formatPrice(price);
    });
    
    // Update original prices
    document.querySelectorAll('[data-original-price]').forEach(el => {
        const price = parseFloat(el.dataset.originalPrice);
        el.textContent = formatPrice(price);
    });
}

// ========================================
// SHOPPING CART
// ========================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartDisplay();
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
    const countElements = document.querySelectorAll('#cart-count');
    const count = getCartItemCount();
    countElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price" data-price="${item.price}">${formatPrice(item.price)}</p>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i data-lucide="trash-2" class="icon"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    if (cartFooter) {
        cartFooter.style.display = 'flex';
    }
    
    if (cartTotalPrice) {
        cartTotalPrice.textContent = formatPrice(getCartTotal());
    }
    
    // Reinitialize Lucide icons for new elements
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function openCart() {
    document.getElementById('cart-drawer').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cart-drawer').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// THEME TOGGLE
// ========================================
function getStoredTheme() {
    return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// ========================================
// DYNAMIC GREETING
// ========================================
function getGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString('en-US', options);
    
    return `${greeting} ☀️ Today is ${date}`;
}

function updateGreeting() {
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        greetingEl.textContent = getGreeting();
    }
}

// ========================================
// PRODUCT RENDERING
// ========================================
function createProductCard(product) {
    const badgeHtml = product.badge 
        ? `<span class="product-badge">${product.badge}</span>` 
        : '';
    
    const originalPriceHtml = product.originalPrice 
        ? `<span class="product-price-original" data-original-price="${product.originalPrice}">${formatPrice(product.originalPrice)}</span>` 
        : '';
    
    return `
        <article class="product-card">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                ${badgeHtml}
            </div>
            <div class="product-content">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <p class="product-price">
                        <span data-price="${product.price}">${formatPrice(product.price)}</span>
                        ${originalPriceHtml}
                    </p>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featured = products.filter(p => p.featured);
    container.innerHTML = featured.map(createProductCard).join('');
}

function renderAllProducts(filter = 'all', search = '') {
    const container = document.getElementById('all-products');
    if (!container) return;
    
    let filtered = products;
    
    // Apply category filter
    if (filter !== 'all') {
        filtered = filtered.filter(p => p.category === filter);
    }
    
    // Apply search filter
    if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        );
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: hsl(var(--muted-foreground));">No products found.</p>';
        return;
    }
    
    container.innerHTML = filtered.map(createProductCard).join('');
}

// ========================================
// MOBILE MENU
// ========================================
function toggleMobileMenu() {
    const nav = document.getElementById('nav-mobile');
    nav.classList.toggle('active');
}

// ========================================
// CONTACT FORM VALIDATION
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    let isValid = true;
    
    // Reset errors
    [name, email, message].forEach(el => el.classList.remove('error'));
    [nameError, emailError, messageError].forEach(el => el.textContent = '');
    
    // Validate name
    if (!name.value.trim()) {
        name.classList.add('error');
        nameError.textContent = 'Please enter your full name';
        isValid = false;
    } else if (name.value.trim().length < 2) {
        name.classList.add('error');
        nameError.textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        email.classList.add('error');
        emailError.textContent = 'Please enter your email address';
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        email.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        message.classList.add('error');
        messageError.textContent = 'Please enter your message';
        isValid = false;
    } else if (message.value.trim().length < 10) {
        message.classList.add('error');
        messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    if (isValid) {
        showToast('Message sent successfully! We\'ll get back to you soon.');
        e.target.reset();
    }
    
    return false;
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set initial theme
    setTheme(getStoredTheme());
    
    // Set initial currency
    const currencySelect = document.getElementById('currency-select');
    if (currencySelect) {
        currencySelect.value = currentCurrency;
        currencySelect.addEventListener('change', (e) => setCurrency(e.target.value));
    }
    
    // Update greeting
    updateGreeting();
    
    // Update cart count
    updateCartCount();
    updateCartDisplay();
    
    // Render products
    renderFeaturedProducts();
    renderAllProducts();
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Cart buttons
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }
    
    const closeCartBtn = document.getElementById('close-cart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }
    
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Product filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            const search = document.getElementById('search-input')?.value || '';
            renderAllProducts(filter, search);
        });
    });
    
    // Product search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
            renderAllProducts(activeFilter, this.value);
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
    
    // Reinitialize icons after dynamic content
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
});

// Escape key to close cart
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCart();
    }
});
