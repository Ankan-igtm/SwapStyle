// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHeroCarousel();
    initializeFilterTabs();
    initializeScrollAnimations();
    initializeFormHandlers();
    initializeButtonHandlers();
});

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Hero Carousel Functionality
function initializeHeroCarousel() {
    const clothingItems = document.querySelectorAll('.clothing-item');
    let currentIndex = 0;

    function rotateCarousel() {
        clothingItems.forEach(item => item.classList.remove('active'));
        clothingItems[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % clothingItems.length;
    }

    // Auto-rotate every 3 seconds
    setInterval(rotateCarousel, 3000);

    // Add hover effect to pause rotation
    const carousel = document.querySelector('.clothing-carousel');
    let isHovered = false;
    let intervalId = setInterval(rotateCarousel, 3000);

    carousel.addEventListener('mouseenter', () => {
        isHovered = true;
        clearInterval(intervalId);
    });

    carousel.addEventListener('mouseleave', () => {
        isHovered = false;
        intervalId = setInterval(rotateCarousel, 3000);
    });
}

// Filter Tabs Functionality
function initializeFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const itemCards = document.querySelectorAll('.item-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            // Show/hide items based on filter
            itemCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.step, .item-card, .feature, .contact-item, .section-header');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Form Handlers
function initializeFormHandlers() {
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactForm(contactForm);
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleNewsletterForm(newsletterForm);
        });
    }
}

function handleContactForm(form) {
    const formData = new FormData(form);
    const formInputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Disable form during submission
    formInputs.forEach(input => input.disabled = true);
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        
        // Re-enable form
        formInputs.forEach(input => input.disabled = false);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }, 1500);
}

function handleNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!emailInput.value) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Disable form during submission
    emailInput.disabled = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';

    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        form.reset();
        
        // Re-enable form
        emailInput.disabled = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
    }, 1500);
}

// Button Handlers
function initializeButtonHandlers() {
    // Join Now button
    const joinBtn = document.getElementById('join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            showModal('Join SwapStyle', 'Ready to start your sustainable fashion journey? Sign up now and get access to thousands of unique clothing items!');
        });
    }

    // Start Swapping button
    const startSwappingBtn = document.getElementById('start-swapping');
    if (startSwappingBtn) {
        startSwappingBtn.addEventListener('click', () => {
            const browseSection = document.getElementById('browse');
            browseSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Learn More button
    const learnMoreBtn = document.getElementById('learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            const howItWorksSection = document.getElementById('how-it-works');
            howItWorksSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Browse All Items button
    const browseAllBtn = document.getElementById('browse-all');
    if (browseAllBtn) {
        browseAllBtn.addEventListener('click', () => {
            showModal('Browse All Items', 'Explore our complete collection of clothing items. Filter by category, size, condition, and more to find your perfect match!');
        });
    }

    // Item action buttons
    const exchangeBtns = document.querySelectorAll('.btn-exchange');
    const buyBtns = document.querySelectorAll('.btn-buy');
    const viewDetailsBtns = document.querySelectorAll('.btn-overlay');

    exchangeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal('Exchange Item', 'Great choice! To exchange this item, you\'ll need to create an account and upload an item of similar value. Our smart matching system will help find the perfect trade!');
        });
    });

    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const price = btn.textContent;
            showModal('Purchase Item', `Ready to buy this item for ${price}? You'll be redirected to our secure checkout process where you can complete your purchase safely.`);
        });
    });

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal('Item Details', 'Here you would see detailed photos, measurements, condition notes, and seller information. You can also check similar items and styling suggestions!');
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                }
                to {
                    transform: translateX(0);
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                margin-left: 1rem;
            }
        `;
        document.head.appendChild(style);
    }
}

function showModal(title, content) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${content}</p>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-cancel">Cancel</button>
                <button class="btn-primary modal-confirm">Continue</button>
            </div>
        </div>
    `;

    // Add styles
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;

    // Add to document
    document.body.appendChild(modalOverlay);

    // Close modal functionality
    const closeModal = () => {
        modalOverlay.remove();
    };

    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.querySelector('.modal-cancel').addEventListener('click', closeModal);
    modalOverlay.querySelector('.modal-confirm').addEventListener('click', () => {
        showNotification('Feature coming soon! Stay tuned for updates.', 'info');
        closeModal();
    });

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Add modal styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .modal-content {
                background: white;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow: auto;
                animation: slideInUp 0.3s ease-out;
            }
            @keyframes slideInUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #e5e7eb;
            }
            .modal-header h3 {
                margin: 0;
                color: #333;
                font-size: 1.5rem;
                font-weight: 600;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-body {
                padding: 1.5rem;
            }
            .modal-body p {
                margin: 0;
                color: #666;
                line-height: 1.6;
            }
            .modal-footer {
                display: flex;
                gap: 1rem;
                padding: 1.5rem;
                border-top: 1px solid #e5e7eb;
                justify-content: flex-end;
            }
        `;
        document.head.appendChild(style);
    }
}

// Add some interactive effects
function addInteractiveEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const shapes = document.querySelectorAll('.shape');
        
        if (hero) {
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });

    // Add hover effects to item cards
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add floating animation to step icons
    const stepIcons = document.querySelectorAll('.step-icon');
    stepIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize interactive effects when DOM is loaded
document.addEventListener('DOMContentLoaded', addInteractiveEffects);

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', scrollToTop);

    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px) scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// Add loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-icon">
                <i class="fas fa-sync-alt"></i>
            </div>
            <div class="loader-text">Loading SwapStyle...</div>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
    `;

    document.body.appendChild(loader);

    // Add loader styles
    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        .loader-content {
            text-align: center;
        }
        .loader-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: spin 2s linear infinite;
        }
        .loader-text {
            font-size: 1.2rem;
            font-weight: 600;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyles);

    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.remove();
                loaderStyles.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading animation
if (document.readyState === 'loading') {
    showLoadingAnimation();
}

// Add typing effect to hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const textWithoutSpan = heroTitle.textContent;
    let index = 0;
    
    heroTitle.innerHTML = '';
    
    function typeText() {
        if (index < textWithoutSpan.length) {
            if (textWithoutSpan.substring(index).startsWith('Transform Your Wardrobe')) {
                heroTitle.innerHTML += '<span class="gradient-text">';
                heroTitle.innerHTML += textWithoutSpan[index];
                index++;
                while (index < textWithoutSpan.length && textWithoutSpan[index] !== '\n') {
                    heroTitle.innerHTML += textWithoutSpan[index];
                    index++;
                }
                heroTitle.innerHTML += '</span>';
                if (index < textWithoutSpan.length) {
                    heroTitle.innerHTML += textWithoutSpan[index];
                    index++;
                }
            } else {
                heroTitle.innerHTML += textWithoutSpan[index];
                index++;
            }
            setTimeout(typeText, 50);
        } else {
            // Restore original HTML structure
            setTimeout(() => {
                heroTitle.innerHTML = originalText;
            }, 500);
        }
    }

    setTimeout(typeText, 1500);
}

// Initialize typing effect
window.addEventListener('load', () => {
    setTimeout(addTypingEffect, 2000);
});

// Add custom cursor effect
function addCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
        transition: all 0.3s ease;
        opacity: 0;
    `;
    
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .item-card, .step, .filter-tab');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize custom cursor (only on desktop)
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', addCustomCursor);
}

// Add image lazy loading simulation
function addImageLazyLoading() {
    const itemImages = document.querySelectorAll('.item-image');
    const clothingImages = document.querySelectorAll('.clothing-image');

    // Create random gradient backgrounds for item images
    const gradients = [
        'linear-gradient(45deg, #ff9a9e, #fecfef)',
        'linear-gradient(45deg, #a8edea, #fed6e3)',
        'linear-gradient(45deg, #ffecd2, #fcb69f)',
        'linear-gradient(45deg, #c3cfe2, #c3cfe2)',
        'linear-gradient(45deg, #667eea, #764ba2)',
        'linear-gradient(45deg, #f093fb, #f5576c)'
    ];

    itemImages.forEach((img, index) => {
        img.style.background = gradients[index % gradients.length];
    });

    clothingImages.forEach((img, index) => {
        img.style.background = gradients[index % gradients.length];
    });
}

// Initialize image lazy loading
document.addEventListener('DOMContentLoaded', addImageLazyLoading);

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add error handling for better user experience
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => modal.remove());
    }
    
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const carousel = document.querySelector('.clothing-carousel');
        if (carousel && carousel.matches(':hover')) {
            // Trigger manual carousel rotation
            const items = carousel.querySelectorAll('.clothing-item');
            const currentActive = carousel.querySelector('.clothing-item.active');
            const currentIndex = Array.from(items).indexOf(currentActive);
            
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
            } else {
                newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
            }
            
            items.forEach(item => item.classList.remove('active'));
            items[newIndex].classList.add('active');
        }
    }
});

// Initialize all features
console.log('SwapStyle website loaded successfully! 🎉');