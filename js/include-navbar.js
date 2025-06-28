document.addEventListener('DOMContentLoaded', () => {
    const navbarPlaceholder = document.createElement('div');
    navbarPlaceholder.id = 'navbar-placeholder';
    document.body.prepend(navbarPlaceholder);

    fetch('/components/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load navbar.html');
            }
            return response.text();
        })
        .then(data => {
            navbarPlaceholder.innerHTML = data;

            // Load navbar.js
            if (!window.navbarInitialized) {
                const script = document.createElement('script');
                script.src = '/js/navbar.js';
                script.async = true;
                script.onload = () => console.log('navbar.js loaded');
                script.onerror = () => console.error('Error loading navbar.js');
                document.head.appendChild(script);
                window.navbarInitialized = true;
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            navbarPlaceholder.innerHTML = '<p>Error loading navigation bar.</p>';
        });
});