document.addEventListener('DOMContentLoaded', () => {
    // Slider functionality
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide-card');
    let currentIndex = 0;

    if (sliderTrack && slides.length > 0) {
        document.querySelector('.next-btn').addEventListener('click', () => {
            if (currentIndex < slides.length - 3) {
                currentIndex++;
                sliderTrack.style.transform = `translateX(-${currentIndex * 33.33}%)`;
            }
        });

        document.querySelector('.prev-btn').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                sliderTrack.style.transform = `translateX(-${currentIndex * 33.33}%)`;
            }
        });
    }

    // Filter functionality
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const priceSelect = document.getElementById('price-select');
    const productCards = document.querySelectorAll('.product-card');
    const noProductsMessage = document.getElementById('no-products-message');

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect.value;
        const price = priceSelect.value;
        let visibleCount = 0;

        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category');
            const cardPrice = card.getAttribute('data-price');

            const matchesSearch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesPrice = price === 'all' || cardPrice === price;

            if (matchesSearch && matchesCategory && matchesPrice) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            noProductsMessage.style.display = 'block';
        } else {
            noProductsMessage.style.display = 'none';
        }
    }

    if (searchInput && categorySelect && priceSelect && productCards.length > 0) {
        searchInput.addEventListener('input', filterProducts);
        categorySelect.addEventListener('change', filterProducts);
        priceSelect.addEventListener('change', filterProducts);
    }
});
