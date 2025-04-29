/**
 * TechIssue - About Page JavaScript
 * Handles interactive elements on the about page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize timeline animations
    initTimelineAnimations();
    
    // Initialize advantages counter
    initCounters();
    
    // Initialize info buttons
    initInfoButtons();
});

/**
 * Initialize timeline animations
 */
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline__item');
    
    // Create timeline animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on item index
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 200);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe timeline items
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

/**
 * Initialize counter animations for advantage numbers
 */
function initCounters() {
    const counterElements = document.querySelectorAll('.counter');
    
    // Create counter animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'), 10);
                
                // Start counter animation
                animateCounter(target, targetValue);
                
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

/**
 * Animate a counter from 0 to target value
 * @param {HTMLElement} element - The counter element
 * @param {number} target - The target value
 */
function animateCounter(element, target) {
    let start = 0;
    const duration = 2000; // 2 seconds
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const value = Math.floor(progress * target);
        element.innerText = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.innerText = target;
        }
    };
    
    window.requestAnimationFrame(step);
}

/**
 * Initialize info buttons for "Saiba mais" functionality
 */
function initInfoButtons() {
    const infoButtons = document.querySelectorAll('.saiba-mais-btn');
    const infoCard = document.getElementById('info-card');
    const infoCardTitle = document.getElementById('info-card-title');
    const infoCardText = document.getElementById('info-card-text');
    const closeButton = document.getElementById('info-card-close');
    
    // Add click event to each info button
    infoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get parent empresa-card to extract title
            const empresaCard = this.closest('.empresa-card');
            const title = empresaCard.querySelector('.empresa-card__title').textContent;
            
            // Get content from the button's data attribute
            const content = this.getAttribute('data-info');
            
            // Update info card with content
            infoCardTitle.textContent = title;
            infoCardText.innerHTML = `<p>${content}</p>`;
            
            // Show the info card
            infoCard.classList.add('active');
            
            // Prevent body scrolling while card is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close button functionality
    closeButton.addEventListener('click', function() {
        closeInfoCard();
    });
    
    // Close on click outside of content
    infoCard.addEventListener('click', function(e) {
        if (e.target === infoCard) {
            closeInfoCard();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && infoCard.classList.contains('active')) {
            closeInfoCard();
        }
    });
    
    // Function to close the info card
    function closeInfoCard() {
        infoCard.classList.remove('active');
        document.body.style.overflow = '';
    }
}
