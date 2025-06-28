// Main script for EduCatalog
document.addEventListener('DOMContentLoaded', function() {
    console.log('EduCatalog main script loaded');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
    });

    // Initialize any other page-specific functionality
    initPageFeatures();
});

function initPageFeatures() {
    // Placeholder for additional page initialization
    console.log('Initializing page features');
    
    // Example: Could add analytics tracking or other features here
}
