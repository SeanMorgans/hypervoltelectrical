// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            mobileMenu.textContent = '☰';
        }
    });
}

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone number clicked - potential lead conversion!');
    });
});

// Email click tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Email link clicked - potential lead!');
    });
});

// Add typing effect to hero tagline (homepage only)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid #9c7945';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.classList.add('typing-complete');
            }, 1000);
        }
    }
    type();
}

// Add entrance animations to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate stats numbers
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const target = parseInt(text.replace(/\D/g, ''));
        
        if (target && target > 0) {
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = text;
                    clearInterval(timer);
                } else {
                    const suffix = text.replace(/\d+/, '');
                    stat.textContent = Math.ceil(current) + suffix;
                }
            }, 30);
        }
    });
}

// Form validation and submission
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message
            alert('Thank you for your enquiry! We will contact you within 2 hours to discuss your project and provide a free quote.');
            this.reset();
            
            // Here you would typically send the form data to your server
            console.log('Form submitted:', Object.fromEntries(formData));
        });
    }
}

// Pricing card selection functionality
function setupPricingCards() {
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Get service name for contact form
            const serviceName = this.querySelector('.service-title, h3').textContent;
            const serviceSelect = document.getElementById('service');
            
            // Auto-select in contact form if visible
            if (serviceSelect) {
                const option = Array.from(serviceSelect.options).find(opt => 
                    opt.text.toLowerCase().includes(serviceName.toLowerCase())
                );
                if (option) {
                    serviceSelect.value = option.value;
                }
            }
            
            // Scroll to contact form if on same page
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Navigate to contact page if not on same page
                window.location.href = 'contact.html';
            }
        });
    });
}

// Navigation scroll effects
function setupScrollEffects() {
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });

    // Setup contact form
    setupContactForm();
    
    // Setup pricing cards
    setupPricingCards();
    
    // Setup scroll effects
    setupScrollEffects();

    // Homepage specific functionality
    if (document.querySelector('.hero .tagline')) {
        // Start entrance animations first
        setTimeout(() => {
            document.querySelectorAll('.hero-content > *').forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 500);

        // Start typing effect after title appears
        setTimeout(() => {
            const tagline = document.querySelector('.tagline');
            if (tagline) {
                const originalText = "Professional electrical services you can trust. Licensed, insured, and ready to solve your electrical needs with precision, safety, and unmatched expertise.";
                typeWriter(tagline, originalText, 35);
            }
        }, 1800);
    }

    // Trigger stats animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add contact form field focus effects
    document.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 0 15px rgba(156, 121, 69, 0.4)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
            this.style.boxShadow = '0 0 10px rgba(156, 121, 69, 0.3)';
        });
    });
});

// Add CSS for selected pricing card
const style = document.createElement('style');
style.textContent = `
    .pricing-card.selected {
        border-color: #9c7945 !important;
        transform: translateY(-8px) scale(1.02) !important;
        box-shadow: 0 15px 40px rgba(156, 121, 69, 0.4) !important;
    }
`;
document.head.appendChild(style);