console.log('navbar.js loaded - initializing top navigation functionality');

function initializeNavbar() {
    console.log('Initializing top navigation functionality');
    
    const menuBtn = document.getElementById('menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

    if (!menuBtn) {
        console.error('Menu button not found');
        setTimeout(initializeNavbar, 100);
        return;
    }

    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
        console.log('Menu button clicked');
        const isActive = mobileNav.classList.contains('active');
        mobileNav.classList.toggle('active');
        menuBtn.setAttribute('aria-label', isActive ? 'Open menu' : 'Close menu');
        menuBtn.textContent = isActive ? '☰' : '✕';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !e.target.closest('.mobile-nav') && 
            e.target !== menuBtn) {
            console.log('Closing mobile menu');
            mobileNav.classList.remove('active');
            menuBtn.setAttribute('aria-label', 'Open menu');
            menuBtn.textContent = '☰';
        }
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            console.log('Escape key pressed, closing mobile menu');
            mobileNav.classList.remove('active');
            menuBtn.setAttribute('aria-label', 'Open menu');
            menuBtn.textContent = '☰';
        }
    });

    // Desktop dropdown toggles
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Desktop dropdown toggle clicked:', toggle);
            const parent = toggle.parentElement;
            const isActive = parent.classList.contains('active');
            
            // Close other dropdowns
            dropdownToggles.forEach(otherBtn => {
                if (otherBtn !== toggle) {
                    const otherParent = otherBtn.parentElement;
                    otherParent.classList.remove('active');
                    otherBtn.setAttribute('aria-expanded', 'false');
                }
            });
            
            parent.classList.toggle('active');
            toggle.setAttribute('aria-expanded', !isActive);
            console.log(`Desktop dropdown ${parent} is now ${!isActive ? 'open' : 'closed'}`);
        });
    });

    // Mobile dropdown toggles
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Mobile dropdown toggle clicked:', toggle);
            const parent = toggle.parentElement;
            const isActive = parent.classList.contains('active');
            
            parent.classList.toggle('active');
            toggle.setAttribute('aria-expanded', !isActive);
            console.log(`Mobile dropdown ${parent} is now ${!isActive ? 'open' : 'closed'}`);
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown') && !e.target.closest('.mobile-dropdown')) {
            dropdownToggles.forEach(toggle => {
                const parent = toggle.parentElement;
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
            mobileDropdownToggles.forEach(toggle => {
                const parent = toggle.parentElement;
                if (parent.classList.contains('active')) {
                    parent.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // Keyboard Navigation
    navLinks.forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                console.log('Keyboard navigation on link:', link);
                e.preventDefault();
                link.click();
            }
        });
    });

    // Focus Management for Accessibility
    document.addEventListener('focusin', (e) => {
        if (e.target.closest('.dropdown-menu') || e.target.closest('.mobile-dropdown-menu')) {
            e.target.closest('.dropdown, .mobile-dropdown').classList.add('active');
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavbar);
} else {
    initializeNavbar();
}