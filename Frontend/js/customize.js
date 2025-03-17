//localStorage.clear(); // Local Storage'ı temizleme

// Buton görünürlüğü kontrol et
window.addEventListener('scroll', function () {
    
    const scrollToTop = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        scrollToTop.style.display = 'block';
    } else {
        scrollToTop.style.display = 'none';
    }
});

document.getElementById('scrollToTop').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Sepet işlemleri
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Ürün zaten sepette varsa, sadece miktarı artırma
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1; // Miktar artışı yapıyoruz
    } else {
        product.quantity = 1; // Yeni ürün ekleniyor
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartBadge();  // Sepet badge'ini güncelle
}

// Sepet ürün sayısını güncelleme
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartBadge = document.querySelector('.badge'); // 'badge' sınıfını kullanarak span'ı seçiyoruz
    let cartBadge2 = document.querySelector('.sepetDurum');

    if (cartBadge) {
        cartBadge.textContent = cart.length; // Sepetteki ürün sayısını badge'de göster
        cartBadge2.textContent=cart.length;
    }
}

// Sepete ekle butonları
document.querySelectorAll('.btn-cart').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();

        // Data attribute'lerden ürünü al
        const product = {
            name: this.dataset.name,
            description: this.dataset.description,
            price: parseFloat(this.dataset.price)
        };

        addToCart(product); // Sepete ekle
    });
});

// Sepet açıldığında render işlemini yap
document.getElementById('offcanvasCart').addEventListener('shown.bs.offcanvas', function () {
    renderCart();
});

// Sepet içeriğini render etme
function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.querySelector('.list-group');
    let totalAmount = 0;

    // Listeyi temizle
    cartList.innerHTML = '';

    // Ürünleri ekle
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;

        let listItem = `
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="my-0">${item.name}</h6>
                <small class="text-body-secondary">${item.description}</small>
            </div>
            <div class="quantity-controls">
                <button class="btn btn-sm btn-secondary me-1" onclick="decreaseQuantity('${item.name}')">-</button>
                <span class="badge bg-primary rounded-pill">${item.quantity}</span>
                <button class="btn btn-sm btn-secondary ms-1" onclick="increaseQuantity('${item.name}')">+</button>

            </div>
            <span class="text-body-secondary">${(item.price * item.quantity).toFixed(2)} TL</span>
            <button class="btn btn-sm btn-removeCart" onclick="removeFromCart('${item.name}')">Sil</button>
        </li>`;
        cartList.innerHTML += listItem;
    });

    // Toplam tutar
    let totalItem = `
    <li class="list-group-item d-flex justify-content-between">
        <span class="fw-bold">Toplam Tutar</span>
        <strong>${totalAmount.toFixed(2)} TL</strong>
    </li>`;
    cartList.innerHTML += totalItem;

    updateCartBadge(); // Sepet badge'ini güncelle
}


document.addEventListener('DOMContentLoaded', function () {
    updateCartBadge(); 
});


function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    renderCart(); 
}

function increaseQuantity(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(item => {
        if (item.name === productName && item.quantity < 10) {
            item.quantity += 1;
        }
        return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    renderCart();
}

function decreaseQuantity(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(item => {
        if (item.name === productName && item.quantity > 1) {
            item.quantity -= 1;
        }
        return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    renderCart();
}


// filepath: c:\Users\emrec\Desktop\website\bettAqua\js\customize.js
let currentPage = 1;
const itemsPerPage = 20;
let products = [];

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/products'); // Backend endpoint URL
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        products = await response.json();
        console.log('Fetched Products:', products); // Debug için
        renderProducts(products, currentPage);
        setupPagination(products);
    } catch (error) {
        console.error('Ürünler alınırken hata oluştu:', error);
    }
}

function renderProducts(products, page) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = ''; // Önceki ürünleri temizle

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
        const productCard = `
            <div class="col mb-4">
                <div class="card product-card position-relative">
                    <a href="single-product.html?id=${product.id}">
                        <img src="${product.imageUrl}" class="img-fluid rounded-4" alt="${product.productName}">
                    </a>
                    <div class="card-body">
                        <a href="single-product.html?id=${product.id}">
                            <h3 class="card-title pt-4 m-0">${product.productName}</h3>
                        </a>
                        <div class="card-text">
                            <span class="rating">
                                ${generateStars(product.rating)}
                                ${product.rating.toFixed(1)}
                            </span>
                            <h3 class="price-font">${product.price.toFixed(2)} TL</h3>
                            <p>${product.description}</p>
                            <div class="d-flex flex-wrap mt-3 justify-content-between">
                                <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3" data-id="${product.id}">
                                    <h5 class="text-uppercase m-0">Sepete Ekle</h5>
                                </a>
                                <input type="number" id="quantity-${product.id}" value="1" min="1" max="10" class="form-control quantity-input">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productContainer.insertAdjacentHTML('beforeend', productCard);
    });
}

function setupPagination(products) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Önceki sayfalama butonlarını temizle

    const pageCount = Math.ceil(products.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) {
            pageItem.classList.add('active');
        }

        const pageLink = document.createElement('a');
        pageLink.classList.add('page-link');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = i;
            renderProducts(products, currentPage);
            setupPagination(products);
        });

        pageItem.appendChild(pageLink);
        paginationContainer.appendChild(pageItem);
    }
}

function generateStars(rating) {
    const fullStar = '<iconify-icon icon="clarity:star-solid" class=" star-icon"></iconify-icon>';
    const emptyStar = '<iconify-icon icon="clarity:star-line" class=" star-icon empty"></iconify-icon>';
    const stars = Math.floor(rating);
    const remaining = 5 - stars;
    return fullStar.repeat(stars) + emptyStar.repeat(remaining);
}

// Sayfa yüklendiğinde ürünleri getir
document.addEventListener('DOMContentLoaded', fetchProducts);



