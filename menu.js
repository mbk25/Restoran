const cart = () => {
    const iconCart = document.querySelector('.icon-cart');
    const closeBtn = document.querySelector('.cartTab .close');
    const body = document.querySelector('body');
    const listProducts = document.querySelector('.listcart');
    let cartItems = [];

    // Sepetin açılması ve kapanması
    const toggleCart = () => {
        body.classList.toggle('activeTabCart');
    };

    iconCart.addEventListener('click', toggleCart);
    closeBtn.addEventListener('click', toggleCart);

    // Ürünü sepete ekleme
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            product.quantity = 1;
            cartItems.push(product);
        }
        refreshCartHTML();
        updateCartCount();
    };

// Sepetten ürünü kaldırma
const removeFromCart = (productId) => {
    cartItems = cartItems.filter(item => item.id !== productId);
    refreshCartHTML();
    updateCartCount();
};

    // Ürün miktarını artırma
    const increaseQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            item.quantity++;
            refreshCartHTML();
            updateCartCount();
        }
    };

    // Ürün miktarını azaltma
    const decreaseQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        if (item && item.quantity > 1) {
            item.quantity--;
            refreshCartHTML();
            updateCartCount();
        }
    };

    // Sepet HTML içeriğini güncelleme
    const refreshCartHTML = () => {
        listProducts.innerHTML = ''; // Önceki içeriği temizle

        let totalPrice = 0;

        cartItems.forEach((product) => {
            const newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <div class="product-info">
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <div class="quantity">
                        <button class="decreaseQuantity" data-id="${product.id}">-</button>
                        Ekle: ${product.quantity}
                        <button class="increaseQuantity" data-id="${product.id}">+</button>
                    </div>
                    <div class="price">₺${product.price * product.quantity}</div>
                    <button class="removeFromCart" data-id="${product.id}">Kaldır</button>
                </div>
            `;
            listProducts.appendChild(newProduct);

            totalPrice += product.price * product.quantity;

            // Sepetten ürünü çıkarma butonuna event ekleme
            const removeButton = newProduct.querySelector('.removeFromCart');
            removeButton.addEventListener('click', () => {
                removeFromCart(product.id);
            });

            // Ürün miktarını artırma butonuna event ekleme
            const increaseButton = newProduct.querySelector('.increaseQuantity');
            increaseButton.addEventListener('click', () => {
                increaseQuantity(product.id);
            });

            // Ürün miktarını azaltma butonuna event ekleme
            const decreaseButton = newProduct.querySelector('.decreaseQuantity');
            decreaseButton.addEventListener('click', () => {
                decreaseQuantity(product.id);
            });
        });

        const totalDiv = document.createElement('div');
        totalDiv.classList.add('total');
        totalDiv.textContent = `Toplam: ₺${totalPrice.toFixed(2)}`;
        listProducts.appendChild(totalDiv);
    };

    // Tüm ürünleri sepete ekleme butonlarına event ekleme
    document.querySelectorAll('.spt').forEach((button) => {
        button.addEventListener('click', (event) => {
            const clickedButton = event.target;
            const parentDiv = clickedButton.closest('.cart');
            const productName = parentDiv.querySelector('h1').textContent;
            const productPrice = parseFloat(parentDiv.querySelector('h2').textContent.replace('₺', ''));
            const productId = parseInt(clickedButton.dataset.id);

            // Ürünü sepete ekle
            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: parentDiv.querySelector('img').src
            });
        });
    });

    // Sepet sayacını güncelleme
    const updateCartCount = () => {
        const cartCountElement = document.querySelector('.icon-cart span');
        if (cartCountElement) {
            const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalCount;
        }
    };

    // Sayfa yüklendiğinde sepeti güncelle
    window.addEventListener('DOMContentLoaded', () => {
        updateCartCount();
    });
};

export default cart();
