/**
 * TechIssue - Main JavaScript File
 * Contains common functionality used across the website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components loader
    loadComponents();
    
    // Initialize theme switcher
    initThemeSwitcher();
    
    // Initialize animations
    initAnimations();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize preloader
    initPreloader();
});

/**
 * Load HTML components (navbar and footer)
 */
function loadComponents() {
    // Load navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('components/navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarContainer.innerHTML = html;
                // After navbar is loaded, initialize its scripts
                initNavbar();
            })
            .catch(error => console.error('Error loading navbar:', error));
    }
    
    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

/**
 * Initialize navbar functionality after loading
 */
function initNavbar() {
    // Get the navbar and toggle button
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar__toggle');
    const navbarMenu = document.querySelector('.navbar__menu');
    const navLinks = document.querySelectorAll('.navbar__link');
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (href === 'index.html' && currentPage === '') || 
            (href === 'index.html' && currentPage === '/')) {
            link.classList.add('active');
        }
        
        // Add event listeners to close menu when a link is clicked on mobile
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) { // Mobile breakpoint from our CSS
                navbar.classList.remove('active');
                navbarMenu.classList.remove('navbar__menu--open');
                navbarToggle.classList.remove('navbar__toggle--open');
                // Enable body scrolling again
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Toggle mobile menu
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            navbarMenu.classList.toggle('navbar__menu--open');
            navbarToggle.classList.toggle('navbar__toggle--open');
            
            // Prevent body scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navbar.classList.contains('active') && 
            !navbarMenu.contains(event.target) && 
            !navbarToggle.contains(event.target)) {
            navbar.classList.remove('active');
            navbarMenu.classList.remove('navbar__menu--open');
            navbarToggle.classList.remove('navbar__toggle--open');
            
            // Enable body scrolling again
            document.body.classList.remove('menu-open');
        }
    });
    
    // Handle resize events to reset menu state on screen size change
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992 && navbar.classList.contains('active')) {
            // Reset menu state for desktop view
            navbar.classList.remove('active');
            navbarMenu.classList.remove('navbar__menu--open');
            navbarToggle.classList.remove('navbar__toggle--open');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Add scroll event to make navbar sticky
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    });
}

/**
 * Initialize theme switcher functionality
 */
function initThemeSwitcher() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme or default to light
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Initialize theme toggle once navbar is loaded
    document.addEventListener('click', function(e) {
        if (e.target.matches('.theme-switch, .theme-switch *')) {
            document.body.classList.toggle('dark-theme');
            
            // Save theme preference
            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
            
            // Update icon
            const themeIcon = document.querySelector('.theme-switch i');
            if (themeIcon) {
                if (isDarkTheme) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        }
    });
}

/**
 * Initialize animations for elements
 */
function initAnimations() {
    // Add animation classes to elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize scroll to top button
 */
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        // Hide preloader after page loads
        window.addEventListener('load', () => {
            preloader.classList.add('preloader--hidden');
            
            // Remove preloader from DOM after animation completes
            setTimeout(() => {
                preloader.remove();
            }, 500);
        });
    }
}
