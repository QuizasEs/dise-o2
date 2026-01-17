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

    // Theme switching logic
    // Available themes: 'default' (original palette), 'green' (green-gray palette), 'cyan' (blue-cyan palette)
    // Future themes can be added to the themes array and themeColors object
    const themes = ['default', 'green', 'cyan'];

    // Theme color definitions
    const themeColors = {
        default: {
            '--primary': '#FFB300',
            '--primary-hover': '#FFCA28',
            '--secondary': '#FF5722',
            '--background-dark': '#0B1120',
            '--card-dark': '#162032',
            '--border-dark': '#233554',
            '--blue-600': '#2563eb',
            '--blue-900': '#1e3a8a',
            '--footer-bg': '#0f1419',
            '--footer-link': '#a0aec0',
            '--footer-link-hover': '#63b3ed',
            '--bg-header': 'rgba(11, 17, 32, 0.9)',
            '--bg-card-darker': '#0e1525',
            '--bg-header-bar': '#111a2e',
            '--hero-pattern': 'radial-gradient(circle at 50% 50%, rgba(11, 17, 32, 0.7) 0%, rgba(11, 17, 32, 1) 100%)',
            '--gradient-hero-radial': 'radial-gradient(ellipse at top, rgba(30, 64, 175, 0.1), rgba(11, 17, 32, 1))',
            '--gradient-image-overlay': 'linear-gradient(to top, rgba(14, 21, 37, 1), transparent)',
            '--gradient-dark-overlay': 'linear-gradient(to top, #0e1525 0%, transparent 100%)',
            '--gradient-opacity-overlay': 'linear-gradient(to top, rgba(14, 21, 37, 1) 0%, transparent 100%)',
            '--shadow-primary': '0 0 15px rgba(255, 179, 0, 0.3)',
            '--shadow-primary-strong': '0 0 20px rgba(255, 179, 0, 0.4)',
            '--shadow-secondary': '0 0 10px rgba(255, 87, 34, 0.3)',
            '--shadow-secondary-strong': '0 0 20px rgba(255, 87, 34, 0.4)'
        },
        green: {
            '--primary': '#49A078',
            '--primary-hover': '#9CC5A1',
            '--secondary': '#216869',
            '--background-dark': '#1F2421',
            '--card-dark': '#216869',
            '--border-dark': '#49A078',
            '--blue-600': '#5b9279',
            '--blue-900': '#2a6b4a',
            '--footer-bg': '#1F2421',
            '--footer-link': '#9CC5A1',
            '--footer-link-hover': '#DCE1DE',
            '--bg-header': 'rgba(31, 36, 33, 0.9)',
            '--bg-card-darker': '#161b19',
            '--bg-header-bar': '#1f2421',
            '--hero-pattern': 'radial-gradient(circle at 50% 50%, rgba(31, 36, 33, 0.7) 0%, rgba(31, 36, 33, 1) 100%)',
            '--gradient-hero-radial': 'radial-gradient(ellipse at top, rgba(30, 64, 175, 0.1), rgba(31, 36, 33, 1))',
            '--gradient-image-overlay': 'linear-gradient(to top, rgba(31, 36, 33, 1), transparent)',
            '--gradient-dark-overlay': 'linear-gradient(to top, #1F2421 0%, transparent 100%)',
            '--gradient-opacity-overlay': 'linear-gradient(to top, rgba(31, 36, 33, 1) 0%, transparent 100%)',
            '--shadow-primary': '0 0 15px rgba(73, 160, 120, 0.3)',
            '--shadow-primary-strong': '0 0 20px rgba(73, 160, 120, 0.4)',
            '--shadow-secondary': '0 0 10px rgba(33, 104, 105, 0.3)',
            '--shadow-secondary-strong': '0 0 20px rgba(33, 104, 105, 0.4)'
        },
        cyan: {
            '--primary': '#5BC0BE',
            '--primary-hover': '#6FFFE9',
            '--secondary': '#3A506B',
            '--background-dark': '#0B132B',
            '--card-dark': '#1C2541',
            '--border-dark': '#3A506B',
            '--blue-600': '#5BC0BE',
            '--blue-900': '#1C2541',
            '--footer-bg': '#0B132B',
            '--footer-link': '#6FFFE9',
            '--footer-link-hover': '#5BC0BE',
            '--bg-header': 'rgba(11, 19, 43, 0.9)',
            '--bg-card-darker': '#0B132B',
            '--bg-header-bar': '#1C2541',
            '--hero-pattern': 'radial-gradient(circle at 50% 50%, rgba(11, 19, 43, 0.7) 0%, rgba(11, 19, 43, 1) 100%)',
            '--gradient-hero-radial': 'radial-gradient(ellipse at top, rgba(91, 192, 190, 0.1), rgba(11, 19, 43, 1))',
            '--gradient-image-overlay': 'linear-gradient(to top, rgba(11, 19, 43, 1), transparent)',
            '--gradient-dark-overlay': 'linear-gradient(to top, #0B132B 0%, transparent 100%)',
            '--gradient-opacity-overlay': 'linear-gradient(to top, rgba(11, 19, 43, 1) 0%, transparent 100%)',
            '--shadow-primary': '0 0 15px rgba(91, 192, 190, 0.3)',
            '--shadow-primary-strong': '0 0 20px rgba(91, 192, 190, 0.4)',
            '--shadow-secondary': '0 0 10px rgba(58, 80, 107, 0.3)',
            '--shadow-secondary-strong': '0 0 20px rgba(58, 80, 107, 0.4)'
        }
    };

    // Get saved theme or default to 'default'
    let currentTheme = localStorage.getItem('theme') || 'default';

    // Function to set theme
    function setTheme(theme) {
        if (!themes.includes(theme)) {
            console.warn(`Theme "${theme}" not available. Available themes:`, themes);
            return;
        }

        // Apply theme colors to CSS variables
        const colors = themeColors[theme];
        Object.keys(colors).forEach(prop => {
            document.documentElement.style.setProperty(prop, colors[prop]);
        });

        localStorage.setItem('theme', theme);
        currentTheme = theme;
        console.log(`Theme switched to: ${theme}`);
    }

    // Function to toggle between current themes
    function toggleTheme() {
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        setTheme(nextTheme);
    }

    // Function to get current theme
    function getCurrentTheme() {
        return currentTheme;
    }

    // Function to get available themes
    function getAvailableThemes() {
        return [...themes];
    }

    // Set initial theme on page load
    setTheme(currentTheme);

    // Expose functions globally for testing/debugging
    // In production, you might want to create a proper API
    window.themeManager = {
        setTheme,
        toggleTheme,
        getCurrentTheme,
        getAvailableThemes
    };

    // Theme Panel Controller
    const themePanel = document.getElementById('theme-panel');
    const themeToggleBtn = document.querySelector('.btn-theme-toggle');
    const themePanelClose = document.querySelector('.theme-panel-close');
    const themeRadios = document.querySelectorAll('input[name="theme"]');

    // Show/hide theme panel
    function toggleThemePanel() {
        if (themePanel) {
            themePanel.style.display = themePanel.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Close theme panel
    function closeThemePanel() {
        if (themePanel) {
            themePanel.style.display = 'none';
        }
    }

    // Handle radio button changes
    function handleThemeChange(event) {
        const selectedTheme = event.target.value;
        setTheme(selectedTheme);
        // Close panel after selection (optional)
        setTimeout(closeThemePanel, 300);
    }

    // Update radio buttons to reflect current theme
    function updateThemeRadios() {
        themeRadios.forEach(radio => {
            radio.checked = radio.value === currentTheme;
        });
    }

    // Event listeners
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleThemePanel);
    }

    if (themePanelClose) {
        themePanelClose.addEventListener('click', closeThemePanel);
    }

    themeRadios.forEach(radio => {
        radio.addEventListener('change', handleThemeChange);
    });

    // Close panel when clicking outside
    document.addEventListener('click', (event) => {
        if (themePanel && themePanel.style.display === 'block' &&
            !themePanel.contains(event.target) &&
            !themeToggleBtn.contains(event.target)) {
            closeThemePanel();
        }
    });

    // Update radios on theme change
    const originalSetTheme = setTheme;
    setTheme = function(theme) {
        originalSetTheme(theme);
        updateThemeRadios();
    };

    // Initial radio state
    updateThemeRadios();

    // Hero expansion logic
    const heroContainers = document.querySelectorAll('.hero-container');
    heroContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            // Remove expanded from all
            heroContainers.forEach(c => c.classList.remove('expanded'));
            // Add expanded to current
            container.classList.add('expanded');
        });
    });

    // On mouseleave from wrapper, remove all expanded
    const heroWrapper = document.querySelector('.hero-wrapper');
    if (heroWrapper) {
        heroWrapper.addEventListener('mouseleave', () => {
            heroContainers.forEach(c => c.classList.remove('expanded'));
        });
    }

    // Mobile hero slideshow
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        heroContainers.forEach((container, i) => {
            container.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroContainers.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        if (window.innerWidth <= 768) {
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        }
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
        heroContainers.forEach(container => container.classList.remove('active'));
    }

    // Check on load and resize
    function checkMobile() {
        if (window.innerWidth <= 768) {
            startSlideshow();
        } else {
            stopSlideshow();
        }
    }

    window.addEventListener('load', checkMobile);
    window.addEventListener('resize', checkMobile);
});
