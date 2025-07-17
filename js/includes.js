// Template include system for HTML components  
async function loadIncludes() {
    const headerPromise = loadHeader();
    const footerPromise = loadFooter();
    
    // Wait for both to complete
    await Promise.all([headerPromise, footerPromise]);
}

async function loadHeader() {
    const headerPlaceholder = document.querySelector('[data-include="header"]');
    if (headerPlaceholder) {
        try {
            const response = await fetch('includes/header.html');
            const headerHTML = await response.text();
            headerPlaceholder.innerHTML = headerHTML;
            
            // Set active navigation state based on current page
            setActiveNav();
            
            // Initialize mobile menu functionality
            initializeMobileMenu();
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }
}

async function loadFooter() {
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

// Initialize mobile menu functionality
function initializeMobileMenu() {
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
}

// Load includes when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    await loadIncludes();
    
    // Remove loading class and show content
    document.body.classList.remove('loading');
    document.body.classList.add('content-loaded');
});