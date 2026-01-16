document.addEventListener('DOMContentLoaded', function() {
    const slideContent = document.querySelector('.company-slide-content');
    if (!slideContent) return; // Skip if not on index page
    const images = Array.from(slideContent.querySelectorAll('img'));
    const originalNum = images.length;

    for (let i = 0; i < 4; i++) {
        images.forEach(img => {
            const clone = img.cloneNode(true);
            slideContent.appendChild(clone);
        });
    }

    const allImages = slideContent.querySelectorAll('img');
    let widthOfOneSet = 0;
    for(let i = 0; i < originalNum; i++) {
        widthOfOneSet += allImages[i].offsetWidth + 10;
    }
    widthOfOneSet -= 10;

    let currentTranslate = 0;
    const speed = 0.5; 
    let isPaused = false;

    function animate() {
        if (!isPaused) {
            currentTranslate -= speed;
            if (currentTranslate <= -widthOfOneSet) {
                currentTranslate += widthOfOneSet;
            }
            slideContent.style.transform = `translateX(${currentTranslate}px)`;
        }
        requestAnimationFrame(animate);
    }
    animate();

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        isPaused = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isPaused = false;
        }, 10); 
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

    // Botón de subir arriba
    const scrollTopBtn = document.querySelector('.btn-scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        smoothScrollTo(0);
    });

    // Navbar visibility on scroll
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down, hide nav
            nav.classList.add('nav--hidden');
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up, show nav
            nav.classList.remove('nav--hidden');
        }

        lastScrollY = currentScrollY;
    });



    function smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // ms
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
});
