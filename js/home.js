/**
 * TechIssue - Home Page JavaScript
 * Handles interactive elements on the home page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero animations
    initHeroAnimations();
    
    // Initialize featured service cards
    initServiceCards();
    
    // Initialize testimonial carousel
    initTestimonials();
});

/**
 * Initialize hero section animations
 */
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroButton = document.querySelector('.hero__button');
    
    // Apply sequential animations
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add('animate-in');
        }, 300);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.classList.add('animate-in');
        }, 600);
    }
    
    if (heroButton) {
        setTimeout(() => {
            heroButton.classList.add('animate-in');
        }, 900);
    }
}

/**
 * Initialize service cards interactive features
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Handle card hover effects
        card.addEventListener('mouseenter', () => {
            card.classList.add('service-card--hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('service-card--hover');
        });
        
        // Handle card click
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });
}

/**
 * Initialize testimonials carousel
 */
function initTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials__container');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const indicators = document.querySelectorAll('.testimonial-indicator');
    
    if (testimonialsContainer && testimonials.length > 0) {
        let currentIndex = 0;
        const totalTestimonials = testimonials.length;
        
        // Function to show testimonial at specified index
        const showTestimonial = (index) => {
            // Normalize index within bounds
            if (index < 0) index = totalTestimonials - 1;
            if (index >= totalTestimonials) index = 0;
            
            currentIndex = index;
            
            // Update container position
            testimonialsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        };
        
        // Event listeners for buttons
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                showTestimonial(currentIndex - 1);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                showTestimonial(currentIndex + 1);
            });
        }
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Automatic slide change
        let autoSlideInterval = setInterval(() => {
            showTestimonial(currentIndex + 1);
        }, 5000);
        
        // Pause autoplay on hover
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                showTestimonial(currentIndex + 1);
            }, 5000);
        });
        
        // Initialize first slide
        showTestimonial(0);
    }
}

/**
 * Initialize animated number counters
 */
function initCounters() {
    const counterElements = document.querySelectorAll('.stats__number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-value'), 10);
                
                // Animate counter
                let start = 0;
                const duration = 2000; // 2 seconds
                const step = timestamp => {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const value = Math.floor(progress * targetValue);
                    target.innerText = value;
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.innerText = targetValue;
                    }
                };
                
                window.requestAnimationFrame(step);
                
                // Unobserve after animation
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.7
    });
    
    // Observe counter elements
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
}
