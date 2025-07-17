// Template include system for HTML components
async function loadIncludes() {
    // Load header
    const headerPlaceholder = document.querySelector('[data-include="header"]');
    if (headerPlaceholder) {
        try {
            const response = await fetch('includes/header.html');
            const headerHTML = await response.text();
            headerPlaceholder.innerHTML = headerHTML;
            
            // Set active navigation state based on current page
            setActiveNav();
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }
    
    // Load footer
    const footerPlaceholder = document.querySelector('[data-include="footer"]');
    if (footerPlaceholder) {
        try {
            const response = await fetch('includes/footer.html');
            const footerHTML = await response.text();
            footerPlaceholder.innerHTML = footerHTML;
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}

// Set active navigation state
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page
    const currentNavLink = document.querySelector(`.nav-${currentPage.replace('.html', '')}`);
    if (currentNavLink) {
        currentNavLink.classList.add('active');
    } else if (currentPage === 'index.html' || currentPage === '') {
        document.querySelector('.nav-home')?.classList.add('active');
    }
}

// Load includes when DOM is ready
document.addEventListener('DOMContentLoaded', loadIncludes);