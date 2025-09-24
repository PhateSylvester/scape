 document.addEventListener('DOMContentLoaded', async () => {
            const productDetailContainer = document.getElementById('productDetail');
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');

            if (!productId) {
                productDetailContainer.innerHTML = '<div class="empty-message">Product ID is missing.</div>';
                return;
            }

            productDetailContainer.innerHTML = `<div class="loader" style="height: 80vh;"><div class="spinner"></div><p>Loading product...</p></div>`;

            try {
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const product = await response.json();

                productDetailContainer.innerHTML = `
                    <div class="product-detail-container">
                        <div class="product-detail-image"><img src="${product.image}" alt="${product.title}"></div>
                        <div class="product-detail-info">
                            <p class="category">${product.category}</p>
                            <h1>${product.title}</h1>
                            <div class="rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</div>
                            <p class="price">₦${(product.price * 500).toFixed(2)}</p>
                            <p class="description">${product.description}</p>
                            <div class="item-actions">
                                <button class="cart-btn" onclick="alert('Add to cart functionality to be implemented here.')">Add to Cart</button>
                            </div>
                        </div>
                    </div>`;
            } catch (error) {
                productDetailContainer.innerHTML = `<div class="empty-message" style="color: red;">Error: ${error.message}</div>`;
            }
        });