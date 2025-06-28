document.addEventListener('DOMContentLoaded', () => {
    const navbarPlaceholder = document.createElement('div');
    navbarPlaceholder.id = 'footer-placeholder';
    document.body.prepend(navbarPlaceholder);

    fetch('/components/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load footer.html');
            }
            return response.text();
        })
        .then(data => {
            navbarPlaceholder.innerHTML = data;

            // Load footer.js
            if (!window.footerInitialized) {
                const script = document.createElement('script');
                script.src = '/js/footer.js';
                script.async = true;

                            script.onload = () => {
                                console.log('footer.js loaded');
                                initializeFooterStyles();
                                updateFooterLayout();
                            };                script.onerror = () => console.error('Error loading footer.js');
                document.head.appendChild(script);
                window.footerInitialized = true;
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            navbarPlaceholder.innerHTML = '<p>Error loading footer.</p>';
        });
});