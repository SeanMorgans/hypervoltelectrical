// Contact form handling for Hypervolt Electrical (Netlify Forms)

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Form submission handler for Netlify
    form.addEventListener('submit', function(e) {
        // Validate required fields before submission
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#f44336';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        // Check email format
        const emailField = document.getElementById('email');
        if (emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                emailField.style.borderColor = '#f44336';
                showMessage('Please enter a valid email address', 'error');
                isValid = false;
            }
        }
        
        // Check consent checkbox
        const consentField = document.getElementById('consent');
        if (!consentField.checked) {
            showMessage('Please consent to being contacted about your enquiry', 'error');
            isValid = false;
            e.preventDefault();
            return;
        }
        
        if (!isValid) {
            e.preventDefault();
            showMessage('Please fill in all required fields correctly', 'error');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Netlify will handle the form submission and redirect
    });
    
    // Function to show messages
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10000;
            max-width: 90%;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
        
        // Scroll to top to make sure user sees the message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Phone number formatting (optional enhancement)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Simple UK phone number formatting
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('44')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                // Keep as is for UK format
            }
            // You can add more sophisticated formatting here
        });
    }
    
    // Form validation enhancement
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = '';
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '';
            }
        });
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#f44336';
                showMessage('Please enter a valid email address', 'error');
            } else {
                this.style.borderColor = '';
            }
        });
    }
});