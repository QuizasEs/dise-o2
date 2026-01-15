document.addEventListener('DOMContentLoaded', function() {
    const slideContent = document.querySelector('.company-slide-content');
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
});
