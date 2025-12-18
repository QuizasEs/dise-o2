document.addEventListener('DOMContentLoaded', function() {
    const slideContent = document.querySelector('.company-slide-content');
    const images = Array.from(slideContent.querySelectorAll('img'));
    const originalNum = images.length;

    // Duplicate images multiple times for seamless infinite loop
    for (let i = 0; i < 4; i++) {
        images.forEach(img => {
            const clone = img.cloneNode(true);
            slideContent.appendChild(clone);
        });
    }

    // Calculate width of one set of images
    const allImages = slideContent.querySelectorAll('img');
    let widthOfOneSet = 0;
    for(let i = 0; i < originalNum; i++) {
        widthOfOneSet += allImages[i].offsetWidth + 10;
    }
    widthOfOneSet -= 10; // subtract last gap

    // Continuous slide animation without visible reset
    let currentTranslate = 0;
    const speed = 0.5; // px per frame
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

    // Pause animation on scroll for better UX
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        isPaused = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isPaused = false;
        }, 10); // Resume after 1 second of no scrolling
    });
});
